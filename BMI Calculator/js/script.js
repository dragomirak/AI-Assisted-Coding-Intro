document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('bmi-form');
  const result = document.getElementById('result');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const needleGroup = document.getElementById('gauge-needle');
  const categoryIcon = document.getElementById('category-icon');
  const resetBtn = document.getElementById('reset');

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function getCategory(bmi){
    if(bmi < 18.5) return {name:'Underweight', cls:'underweight'};
    if(bmi < 25) return {name:'Normal', cls:'normal'};
    if(bmi < 30) return {name:'Overweight', cls:'overweight'};
    return {name:'Obese', cls:'obese'};
  }

  function updatePointer(bmi){
    // Map BMI range 10..40 to angle 180..0 (leftmost to rightmost semicircle)
    const min = 10, max = 40;
    const frac = clamp((bmi - min) / (max - min), 0, 1);
    const angle = 180 - (frac * 180);
    if(needleGroup) needleGroup.style.transform = `rotate(${angle}deg)`;
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if(!height || !weight || height <= 0 || weight <= 0){
      bmiValue.textContent = '--';
      bmiCategory.textContent = 'Please enter valid height and weight.';
      result.classList.remove('hidden');
      return;
    }

    const bmi = weight / ((height/100) ** 2);
    const rounded = Math.round(bmi * 10) / 10;
    const cat = getCategory(bmi);

    // animate BMI number from previous value
    const prev = parseFloat(bmiValue.textContent) || 0;
    const start = prev;
    const end = rounded;
    const duration = 600;
    const startTime = performance.now();

    function animate(now){
      const t = Math.min(1, (now - startTime) / duration);
      const v = Math.round((start + (end - start) * t) * 10) / 10;
      bmiValue.textContent = v;
      if(t < 1) requestAnimationFrame(animate);
      else bmiValue.textContent = end; // ensure exact
    }
    requestAnimationFrame(animate);

    // set category text and badge
    const categoryText = document.querySelector('#bmi-category .category-text');
    const badge = document.getElementById('bmi-badge');
    if(categoryText) categoryText.textContent = `${cat.name} (BMI ${rounded})`;
    if(badge){ badge.textContent = cat.name; badge.className = 'badge ' + cat.cls; }

    result.classList.remove('hidden');

    // update gauge needle and arc highlights
    updatePointer(bmi);
    // dim all arcs
    Array.from(document.querySelectorAll('#bmi-gauge .arc')).forEach(a=>{ a.style.opacity = '.35'; a.style.strokeWidth = '24'; });
    const activeArc = document.querySelector('#bmi-gauge .arc.' + cat.cls);
    if(activeArc){ activeArc.style.opacity = '1'; activeArc.style.strokeWidth = '28'; }

    // show a small category icon and animate it
    const iconMap = { underweight: '😕', normal: '😊', overweight: '😐', obese: '😟' };
    if(categoryIcon){
      categoryIcon.textContent = iconMap[cat.cls] || '';
      categoryIcon.classList.remove('pop');
      void categoryIcon.offsetWidth; // reflow
      categoryIcon.classList.add('pop');
    }

    // add small bounce animation to value
    bmiValue.classList.remove('animate');
    void bmiValue.offsetWidth; // force reflow
    bmiValue.classList.add('animate');

    // compute and show recommended healthy weight range for this height
    const h = height / 100;
    const minW = Math.round(18.5 * h * h * 10) / 10;
    const maxW = Math.round(24.9 * h * h * 10) / 10;
    const weightRangeEl = document.getElementById('weight-range');
    if(weightRangeEl) weightRangeEl.textContent = `Healthy weight range for this height: ${minW} kg — ${maxW} kg (BMI 18.5–24.9)`;
  });

  resetBtn.addEventListener('click', ()=>{
    form.reset();
    bmiValue.textContent = '--';
    bmiCategory.textContent = 'Enter your details and press Calculate';
    result.classList.add('hidden');
    // reset needle to leftmost
    if(needleGroup) needleGroup.style.transform = 'rotate(-180deg)';
    // reset arcs
    Array.from(document.querySelectorAll('#bmi-gauge .arc')).forEach(a=>{ a.style.opacity = '.35'; a.style.strokeWidth = '24'; });
    // clear icon
    if(categoryIcon) categoryIcon.textContent = '';
  });
});
