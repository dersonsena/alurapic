export default class FotoService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  }

  listar() {
    return this._resource
      .query()
      .then(response => response.json(), error => {
        console.error(error);
        throw new Error('Não foi possível obter as fotos');
      });
  }

  cadastrar(foto) {

    if (foto._id) {
      return this._resource
        .update({ id: foto._id }, foto);
    }

    return this._resource
      .save(foto);
  }

  apagar(id) {
    return this._resource
      .delete({ id })
      .then(null, error => {
        console.error(error);
        throw new Error('Não foi possível remover a foto');
      });
  }

  buscar(id) {
    return this._resource
      .get({ id })
      .then(response => response.json());
  }
}
