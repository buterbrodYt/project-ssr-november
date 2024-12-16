export default class Fetch {
  constructor() {
    this.id = localStorage.getItem("savedId");
    this.BASE_URL = "https://67266547302d03037e6d6bc0.mockapi.io/v1/";
  }

  async fetchApi(url) {
    try {
      const date = await fetch(url);
      if (!date.ok) {
        throw new Error("Ошибка сети");
      }
      return await date.json();
    } catch (error) {
      new Error("Ошибка при получении данных:", error);
    }
  }

  async fetchPOST() {
    
  }
}
async function updateSightCard(id, updatedData) {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
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