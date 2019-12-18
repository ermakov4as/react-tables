class TableStore {
  @observable elements = [];
  @observable isVisible = false;

  @action changeVisible() {
    this.isVisible = !this.isVisible
  }

  @computed get total() {
    return this.elements.length
  }
}

export default new TableStore();