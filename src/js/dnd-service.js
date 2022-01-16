export default class DndService{
  static async getService(category, specific){
    return fetch(`https://www.dnd5eapi.co/api/${category}/${specific}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      }) 
  }
}