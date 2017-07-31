export class Tipopergunta {
  constructor(public id: string, public descricao: string) { }
  getTiposPerguntas() {
    return [
      new Tipopergunta("1", "Caixa de comentário"),
      new Tipopergunta("2", "O quanto indica a empresa"),
      new Tipopergunta("3", "5 estrelas")
    ]
  }

}
