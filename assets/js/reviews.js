export default class Reviews {
    constructor(fetch) {
      this.fetch = fetch;
      this.name = document.getElementById("reviewsName");
      this.rating = document.getElementById("reviewsRating");
      this.description = document.getElementById("reviewsDescription");
      this.id = localStorage.getItem("savedId");
      this.url = new URL(`https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card/${this.id}/reviews`);
      this.Data = [];
    }
  
    async uploadReview() {
      const newReview = {
        name: this.name.value,
        rating: this.rating.value,
        description: this.description.value
      };
      await this.fetch.fetchPOST(this.url, newReview);
    }

    async displayReviews() {
        this.Data = await this.fetch.fetchApi(this.url);
        
        const reviewContainer = document.getElementById("reviewsData");

        this.Data.forEach(review => {
            let reviews = document.createElement("div");
            reviews.classList.add("sight__reviews-review");
            
            let del = document.createElement("button");
            del.classList.add("sight__reviews-review-delete");
            del.setAttribute("id",review.id);
            reviews.appendChild(del);

            let reviewsBlock = document.createElement("div");
            reviewsBlock.classList.add("sight__reviews-review-block");
            reviews.appendChild(reviewsBlock);

            let name = document.createElement("p");
            name.textContent = review.name;
            name.classList.add("sight__reviews-review-name");
            reviewsBlock.appendChild(name)
    
            let rating = document.createElement("p");
            rating.classList.add("sight__reviews-review-rating");
            const ratingText = "★ ";
            rating.textContent = (ratingText.repeat(review.rating));
            reviewsBlock.appendChild(rating);

            let description = document.createElement("p");
            description.classList.add("sight__reviews-review-description");
            description.textContent = review.description;
            reviews.appendChild(description);
            reviewContainer.appendChild(reviews);
        })
    }

    reviewDelete() {
        const delBtn = document.querySelectorAll(".sight__reviews-review-delete");
        
        delBtn.forEach(del => {
            let id = del.getAttribute("id");
            del.addEventListener("click",() => {
                this.fetch.fetchDelete(this.url+`/${id}`);
            })
        })
    }

    reviewOpen() {
        this.back = document.getElementById("modalBack");
        this.modal = document.getElementById("modalReview");
        this.modal.style.animation = "fade 2s easy";
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