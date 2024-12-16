class reviews {
    constructor() {
        this.id = localStorage.getItem("savedId");
        this.name = document.getElementById("reviewsName");
        this.rating = document.getElementById("reviewsRating");
        this.description = document.getElementById("reviewsDescription");
        this.url = new URL(`https://67266547302d03037e6d6bc0.mockapi.io/v1/sight-card/${this.id}`);
    }

    uploadReviews() {
        fetch(this.url,)
    }
}


async function updateSightCard(id, updatedData) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error('Ошибка при обновлении данных');
    }
    return await response.json();
  }