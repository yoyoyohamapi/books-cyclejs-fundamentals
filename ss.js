function part1(DOMSource) {
  const weightChange$ = DOMSource.select('.weight').events('input').map(evt => evt.target.value);
  const heightChange$ = DOMSource.select('.height').events('input').map(evt => evt.target.value);
  return { weightChange$, heightChange$ };
}

function part2(weightChange$, heightChange$) {
  return Rx.Observable.combineLatest(
    weightChange$.startWith(70),
    heightChange$.startWith(170),
    (weight, height) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return { bmi, weight, height };
    });
}

function part3(state$) {
  return {
    DOM: bmi$.map(({ bmi, weight, height }) =>
      div([
        div([
          label(`Weight: ${weight} kg`),
          input('.weight', { type: 'range', min: 40, max: 150, value: weight })
        ]),
        div([
          label(`Height: ${height} cm`),
          input('.height', { type: 'range', min: 140, max: 220, value: height })
        ]),
        h2(`BMI is ${bmi}`)
      ]))
  };
}

function main(sources) {
  const { weightChange$, heightChange$ } = part1(DOM.source);
  const state$ = part2(weightChange$, heightChange$);
  const vtree$ = part3(state$);
  return vtree$;
}
