import {EntityState} from '@reduxjs/toolkit';
import {TodoModel} from './todo.model';

export interface TodosState extends EntityState<TodoModel> {

}