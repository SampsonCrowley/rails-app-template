import Routes from 'routes.json'

class RouteParser {

  constructor() {
    this.routes = Routes.links || {}
    this.current = this.routes.root
  }

  async setPath(location){
    const path = location.pathname.slice(1, location.pathname.length).split("/")[0]

    this.title = null

    this.current = this.routes[path] || this.routes.root
    if(this.current.alias) this.current = this.routes[this.current.to] || this.routes.root
    if(this.current.resource) {
      const regex = new RegExp(path + "/(.*?)(\\/|\\?|$)"),
            matches = location.pathname.match(regex);

      let id = (matches ? matches[1] : null);

      console.log(regex, id, location.pathname.match(regex))

      if(this.current.api && id){
        const result = await fetch(this.current.api + id),
              resource = await result.json()
        id = resource[this.current.method || 'title']
      }
      this.title = this.current.title.replace(/%RESOURCE%/, id)
    }

    this.title = this.title || this.current.title

    this.setDocumentTitle()

    return {
      title: this.title,
      subtitle: this.current.description,
    }
  }

  setDocumentTitle(){
    document && (document.title = this.title)
  }

}

const RouteList =  new RouteParser()

export default RouteList
