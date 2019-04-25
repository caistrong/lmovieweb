/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('behavior_info', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		openId: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		behaviorType: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		movieId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
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
		}
	}, {
		tableName: 'behavior_info'
	});
};
