/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_info', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		openId: {
			type: DataTypes.STRING(45),
			allowNull: true,
			unique: true
		},
		sessionKey: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		unionId: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		userInfo: {
			type: DataTypes.STRING(512),
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
		}
	}, {
		tableName: 'user_info'
	});
};
