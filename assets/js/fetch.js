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

  async fetchPOST(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
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

  async fetchDelete(url) {
    try {
        const response = await fetch(url, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
      } catch (error) {
        throw new Error("Ошибка при обновлении данных:", error);
      }
  }

}