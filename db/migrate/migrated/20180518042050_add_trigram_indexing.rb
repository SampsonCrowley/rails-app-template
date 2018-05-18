class AddTrigramIndexing < ActiveRecord::Migration[5.2]
  def up
    execute "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
    execute "CREATE EXTENSION IF NOT EXISTS btree_gin;"

  end
  def down
    execute "DROP EXTENSION IF EXISTS btree_gin;"
    execute "DROP EXTENSION IF EXISTS pg_trgm;"
  end
end
## ADD TRIGRAM INDEX:  execute "CREATE INDEX table_column_search_idx ON table USING gin (column gin_trgrm_ops);"
## remove TRIGRAM INDEX:  execute "DROP INDEX table_column_search_idx;"
