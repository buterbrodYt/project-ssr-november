export default class Reviews {
    constructor(fetch) {
      this.fetch = fetch;
      this.ar = [];
      this.name = document.getElementById("reviewsName");
      this.rating = document.getElementById("reviewsRating");
      this.description = document.getElementById("reviewsDescription");
    }
  
    async uploadReview(url, existingReviews) {
      const newReview = {
        name: this.name.value,
        rating: this.rating.value,
        description: this.description.value
      };
      this.ar.push(newReview);
      const updatedReviews = [...this.ar, ...existingReviews];
      await this.fetch.fetchPUT(url, { reviews: updatedReviews });
    }

    reviewOpen() {
        this.back = document.getElementById("modalBack");
        this.back.style.display = "flex";
        window.addEventListener("click",(event) => {
            if (event.target === this.back) {
                this.reviewClose();
            }
        }) 
    }

    reviewClose() {
        this.back.style.display = "none";
    }
}