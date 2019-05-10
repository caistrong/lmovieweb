const { assert } = require('chai');
const movieService = require('../src/service/movie_service');

describe('GeyMovieList', () => {
	describe('7 hots', () => {
		it('should return 7 hots movies', async () => {
			const openId = 'xxx';
			const rsp = await movieService.getMovieList(openId);
			const { data } = rsp;
			const hotCount = data.filter(movie => movie.source === 1).length; // source =1 表示来自热门
			assert.equal(hotCount, 7);
		});
	});
	describe('3 hots 4 recommends', () => {
		it('should return 3 hots movies and 4 recommends movies', async () => {
			const openId = 'oqPrs0BatbBtkXyNRUfRPbw-Jpco';
			const rsp = await movieService.getMovieList(openId);
			const { data } = rsp;
			const hotCount = data.filter(movie => movie.source === 1).length; // source =1 表示来自热门
			const recCount = data.filter(movie => movie.source === 2).length; // source =2 表示来自推荐
			assert.equal(hotCount, 3);
			assert.equal(hotCount, 4);
		});
	});
});