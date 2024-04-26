const search = async (search?: string) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}&type=track`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1e57d89d73msh2497b5eeba6c609p1a4a63jsnfd276511d504',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default () => ({
  search,
});
