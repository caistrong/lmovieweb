/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('movie_info', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		directors: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		screenwriters: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		types: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		nations: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		languages: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		releaseDate: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		year: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		duration: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		actors: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		knownAs: {
			type: DataTypes.STRING(512),
			allowNull: true
		},
		doubanId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			unique: true
		},
		imdbId: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		posterUrl: {
			type: DataTypes.STRING(512),
			allowNull: true
		},
		star: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		rate: {
			type: DataTypes.INTEGER(4).UNSIGNED,
			allowNull: true
		},
		votesNum: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		fiveStarRatio: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		fourStarRatio: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		threeStarRatio: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		twoStarRatio: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		oneStarRatio: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		posterX: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		posterY: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		doubanUrl: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		createdTime: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updateTime: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		playLinks: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'movie_info'
	});
};
