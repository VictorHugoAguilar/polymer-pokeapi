const service = {
    getData(offset = 0, limit = 20) {
        let data = [];
        const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
        const result = this.makeRequest(URL);
        const response = JSON.parse(result);
        // console.log(response);
        response.results.forEach(({ name, url }, index) => {
            const ability = this.makeRequest(`https://pokeapi.co/api/v2/ability/${index + 1}`);
            const {
                effect_entries: [, { effect }],
            } = JSON.parse(ability);
            const imgs = this.makeRequest(url);
            // console.log(JSON.parse(imgs));
            const { sprites, abilities, base_experience, id } = JSON.parse(imgs);
            data = [...data, { name, sprites, abilities, base_experience, id, effect }];
        });
        // console.log(JSON.stringify(data));
        return data;
        return {};
    },

    makeRequest(url, method = "GET") {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.send();
        return xhr.response;
    },
};
