export default class Fetch {
    constructor() {
        this.url = new URL("https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card");
        this.urlOfAll = new URL("https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card");
        this.data = [];
        this.allData = [];
    }

    async fetchData() {
        try {
          const dataResponse = await fetch(this.url);
          if (!Response.ok) {
            throw new Error("Ошибка сети");
          }
          this.data = await dataResponse.json();
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
    }

    async fetchAllData() {
        try {
            const allDataResponse = await fetch(this.urlOfAll);
            if (!allDataResponse.ok) {
              throw new Error("Ошибка сети");
            }
            this.allData = await allDataResponse.json();
          } catch (error) {
            console.error("Ошибка при получении данных:", error);
          }
    }

    get Data() {
        this.fetchData();
        return this.Data;
    }

    get AllData() {
        this.fetchAllData()
        return this.allData;
    }
}