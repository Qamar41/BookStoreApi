import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto, VirtualColumn } from '../../decorators';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import type { IUserSettingsEntity } from './user-settings.entity';
import { UserSettingsEntity } from './user-settings.entity';
import { BookEntity } from '../book/book.entity';
import { Exclude } from 'class-transformer';
import { CartEntity } from '../cart/cart.entity'
import { OrderEntity } from '../order/order.entity';


export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  role: RoleType;

  email?: string;

  password?: string;

  phone?: string;

  avatar?: string;

  fullName?: string;

  settings?: IUserSettingsEntity;
  points: number;
}


@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity
  extends AbstractEntity<UserDto, UserDtoOptions>
  implements IUserEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ default: 100 })
  points: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @VirtualColumn()
  fullName?: string;

  @OneToOne(() => UserSettingsEntity, (userSettings) => userSettings.user)
  settings?: UserSettingsEntity;

  @OneToMany(() => BookEntity, (book) => book.writerUser)
  books: BookEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.owner)
  cartItems: CartEntity[];

  @OneToMany(() => OrderEntity, order => order.customer) // Inverse relation with OrderEntity
  orders: OrderEntity[];

}


