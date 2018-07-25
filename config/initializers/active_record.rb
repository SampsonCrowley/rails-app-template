ActiveSupport.on_load(:active_record) do
  include NullifyBlankAttributes
end

# ActiveRecord::Batches.module_eval do
#   def split_batches(options = {}, &block)
#     options.assert_valid_keys(:start, :batch_size, :preserve_order)
#     if block_given? && arel.orders.present? && options[:preserve_order]
#       relation = self
#       offset = options[:start] || 0
#       batch_size = options[:batch_size] || 1000
#
#       total = relation.count(:*)
#       records = relation.limit(batch_size).offset(offset).to_a
#       while records.any?
#         records_size = records.size
#
#         block.call records
#
#         break if records_size < batch_size
#         offset += batch_size
#         records = relation.limit(batch_size).offset(offset).to_a
#       end
#       nil
#     else
#       find_in_batches(options.except(:preserve_order), &block)
#     end
#   end
# end

module ActiveRecord
  module Batches
    def split_batches(options = {}, &block)
      options.assert_valid_keys(:start, :batch_size, :preserve_order)
      if block_given? && arel.orders.present? && options[:preserve_order]
        relation = self
        offset = options[:start] || 0
        batch_size = options[:batch_size] || 1000

        total = relation.count(:*)
        records = relation.limit(batch_size).offset(offset).to_a
        while records.any?
          records_size = records.size

          block.call records

          break if records_size < batch_size
          offset += batch_size
          records = relation.limit(batch_size).offset(offset).to_a
        end
        nil
      else
        find_in_batches(options.except(:preserve_order), &block)
      end
    end
  end

  module Reflection
    class AbstractReflection
      def join_scope(table, foreign_klass)
        predicate_builder = predicate_builder(table)
        scope_chain_items = join_scopes(table, predicate_builder)
        klass_scope       = klass_join_scope(table, predicate_builder)

        if type
          klass_scope.where!(type => foreign_klass.__send__(options[:primary_type] || :table_name))
        end

        scope_chain_items.inject(klass_scope, &:merge!)
      end
    end

    class RuntimeReflection < AbstractReflection # :nodoc:
      delegate :scope, :type, :constraints, :get_join_keys, :options, to: :@reflection
    end
  end

  module Associations
    class AssociationScope #:nodoc:
      def self.get_bind_values(owner, chain)
        binds = []
        last_reflection = chain.last

        binds << last_reflection.join_id_for(owner)
        if last_reflection.type
          binds << owner.class.__send__(last_reflection.options[:primary_type].presence || :table_name)
        end

        chain.each_cons(2).each do |reflection, next_reflection|
          if reflection.type
            binds << next_reflection.klass.__send__(reflection.options[:primary_type].presence || next_reflection[:primary_type].presence || :table_name)
          end
        end
        binds
      end

      private
        def last_chain_scope(scope, reflection, owner)
          join_keys = reflection.join_keys
          key = join_keys.key
          foreign_key = join_keys.foreign_key

          table = reflection.aliased_table
          value = transform_value(owner[foreign_key])
          scope = apply_scope(scope, table, key, value)

          if reflection.type
            polymorphic_type = transform_value(owner.class.__send__(reflection.options[:primary_type].presence || :table_name))
            scope = apply_scope(scope, table, reflection.type, polymorphic_type)
          end

          scope
        end

        def next_chain_scope(scope, reflection, next_reflection)
          join_keys = reflection.join_keys
          key = join_keys.key
          foreign_key = join_keys.foreign_key

          table = reflection.aliased_table
          foreign_table = next_reflection.aliased_table
          constraint = table[key].eq(foreign_table[foreign_key])

          if reflection.type
            value = transform_value(next_reflection.klass.__send__(reflection.options[:primary_type].presence || :table_name))
            scope = apply_scope(scope, table, reflection.type, value)
          end

          scope.joins!(join(foreign_table, constraint))
        end
    end

    module Builder
      class Association
        def self.valid_options(options)
          VALID_OPTIONS + [ :primary_type ] + Association.extensions.flat_map(&:valid_options)
        end
      end
    end

    class BelongsToPolymorphicAssociation < BelongsToAssociation
      def klass
        type = owner[reflection.foreign_type]
        type.presence && type.capitalize.singularize.constantize
      end
    end
  end

  class Relation
    # pluck_in_batches:  yields an array of *columns that is at least size
    #                    batch_size to a block.
    #
    #                    Special case: if there is only one column selected than each batch
    #                                  will yield an array of columns like [:column, :column, ...]
    #                                  rather than [[:column], [:column], ...]
    # Arguments
    #   columns      ->  an arbitrary selection of columns found on the table.
    #   batch_size   ->  How many items to pluck at a time
    #   &block       ->  A block that processes an array of returned columns.
    #                    Array is, at most, size batch_size
    #
    # Returns
    #   nothing is returned from the function
    def pluck_in_batches(*columns, batch_size: 1000)
      if columns.empty?
        raise "There must be at least one column to pluck"
      end

      # the :id to start the query at
      batch_start = nil

      # It's cool. We're only taking in symbols
      # no deep clone needed
      select_columns = columns.dup

      # Find index of :id in the array
      remove_id_from_results = false
      id_index = columns.index(primary_key.to_sym)

      # :id is still needed to calculate offsets
      # add it to the front of the array and remove it when yielding
      if id_index.nil?
        id_index = 0
        select_columns.unshift(primary_key)

        remove_id_from_results = true
      end

      loop do
        relation = self.reorder(table[primary_key].asc).limit(batch_size)
        relation = relation.where(table[primary_key].gt(batch_start)) if batch_start
        items = relation.pluck(*select_columns)

        break if items.empty?

        # Use the last id to calculate where to offset queries
        last_item = items.last
        batch_start = last_item.is_a?(Array) ? last_item[id_index] : last_item

        # Remove :id column if not in *columns
        items.map! { |row| row[1..-1] } if remove_id_from_results

        yield items

        break if items.size < batch_size
      end
    end
  end

  class Migration
    include AuditableTable
    include LoginableTable
  end
end

class Array
  def split_batches(*args, &block)
    self.in_groups_of(1000, false) do |group|
      block.call(group)
    end
  end
end
