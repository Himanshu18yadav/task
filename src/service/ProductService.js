export const ProductService = {
    getArtworks() {
        return fetch('https://api.artic.edu/api/v1/artworks?page=1')
            .then(response => response.json())
            .then(data => data.data);
    }
};
