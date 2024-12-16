export default class Fetch {
  constructor() {}

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

  async fetchPUT(url, data) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return await response.json();
    } catch (error) {
      throw new Error("Ошибка при обновлении данных:", error);
    }
  }

}