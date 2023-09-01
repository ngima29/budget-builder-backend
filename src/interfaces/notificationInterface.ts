import * as Sequelize from 'sequelize';

export interface InputNotificationInterface {
    type: string;
    readAt: string;
    data: string;
}

export interface NotificationInterface extends InputNotificationInterface {
    id: Sequelize.CreationOptional<number>
}


export interface NotificationModelInterface extends Sequelize.Model<Partial<NotificationInterface>, Partial<InputNotificationInterface>>,
    NotificationInterface { }