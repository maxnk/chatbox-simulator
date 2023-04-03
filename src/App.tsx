import React from 'react';
import './App.css';
import {faker} from '@faker-js/faker';
import {register} from 'timeago.js';
import {observer} from 'mobx-react';
import {configure} from 'mobx';
import {MainContainer} from './components/main-container/main-container';
import {setDefaultOptions} from 'date-fns';
import {ru} from 'date-fns/locale';

faker.locale = 'ru';

initTimeago();
configure({enforceActions: 'always'});

function App() {
  return (
      <MainContainer />
  );
}

function initTimeago() {
  const localeFunc = (number: number, index: number, totalSec?: number): [string, string] => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['now', 'right now'] as [string, string],
      // ['%s sec', 'in %s seconds'] as [string, string],
      [Math.floor((totalSec ?? 0) / 10) * 10  + ' sec', 'in %s seconds'] as [string, string],
      ['1 min', 'in 1 minute'] as [string, string],
      ['%s min', 'in %s minutes'] as [string, string],
      ['1 hr', 'in 1 hour'] as [string, string],
      ['%s hr', 'in %s hours'] as [string, string],
      ['1 day', 'in 1 day'] as [string, string],
      ['%s day', 'in %s days'] as [string, string],
      ['1 week', 'in 1 week'] as [string, string],
      ['%s week', 'in %s weeks'] as [string, string],
      ['1 mon', 'in 1 month'] as [string, string],
      ['%s mon', 'in %s months'] as [string, string],
      ['1 year', 'in 1 year'] as [string, string],
      ['%s year', 'in %s years'] as [string, string]
    ][index];
  };
// register your locale with timeago
  register('custom-locale', localeFunc);
}

setDefaultOptions({
  locale: ru
});

export default observer(App);
