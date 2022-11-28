import React from 'react'
import * as C from './Dash.styles'
import {Category} from '../types/Category'
import {Item} from '../types/Item'
import {categories} from '../data/categories'
import {items} from '../data/items'
import { useState, useEffect } from 'react';
import { filterListByMonth, getCurrentMonth } from '../helpers/dateFilter'
import { InfoArea } from './InfoArea'
import TableArea from './TableArea/index';

import Add from 'add/Add';

const Dashboard = () => {

  const[list, setList] = useState<Item[]>(items);
  const[filtredList, setFiltredList] = useState<Item[]>([]);
  const[currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const[income, setIncome] = useState(0);
  const[expense, setExpense] = useState(0);

  useEffect(()=> {
      setFiltredList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth]);

  useEffect(()=> {
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filtredList){
      if(categories[filtredList[i].category].expense){
        expenseCount+= filtredList[i].value;
      }else {
        incomeCount+= filtredList[i].value;
      }

      setIncome(incomeCount);
      setExpense(expenseCount);
    }


  }, [filtredList]);

  const handleMonthChange = (newMonth: string)=> {
    setCurrentMonth(newMonth)
  }

  const handleAddItem = (item: Item)=> {
    console.log("Item adicionado na lista - MFE DASH")
    let newList = [... list];
    newList.push(item);
    setList(newList);
  }

  return (
    <C.Body>
      {/* Informações */}
      <InfoArea 
      currentMonth={currentMonth}
      onMonthChange={handleMonthChange}
      income={income}
      expense={expense}

      />
      {/* Inserir informação */}
      <Add onAdd={handleAddItem}/>
      {/* Tabela */}
      <TableArea list={filtredList}/>
    </C.Body>
  )
}

export default Dashboard
