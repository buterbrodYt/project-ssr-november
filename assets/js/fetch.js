export default class Fetch {
    constructor() {
        this.url = new URL("https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card");
        this.urlOfAll = new URL("https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card");
        this.data = [];
        this.allData = [];
    }

    async fetchData() {
        this.updateParams();
        try {
            const dataResponse = await fetch(this.url);
            if (!dataResponse.ok) {
                throw new Error("Ошибка сети");
            }
            this.data = await dataResponse.json();
            
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    updateParams() {
        this.currentPage = parseInt(localStorage.getItem("savedPage")) || 1;
        this.searchTerm = localStorage.getItem("savedSearch") || "";
        this.selectedCategory = localStorage.getItem("savedCategory") || "";
        this.selectedSort = localStorage.getItem("savedSort") || "";
        this.selectedOrder = localStorage.getItem("savedOrder") || "";
        this.itemsPerPage = parseInt(localStorage.getItem("savedItemPerPage")) || 9;
        if (this.selectedCategory == "all") {
            this.selectedCategory = "";
        }
        if (this.selectedSort == "none") {
            this.selectedSort = "";
        }

        this.url.searchParams.set("limit", this.itemsPerPage);
        this.url.searchParams.set("page", this.currentPage);
        this.url.searchParams.set("title", this.searchTerm);
        this.url.searchParams.set("sortBy", this.selectedSort);
        this.url.searchParams.set("order", this.selectedOrder);
        this.urlOfAll.searchParams.set("title", this.searchTerm);
        this.url.searchParams.set("category", this.selectedCategory);
        this.urlOfAll.searchParams.set("category", this.selectedCategory);
    }

    async fetchAllData() {
        this.updateParams();
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
}
