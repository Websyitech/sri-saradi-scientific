(() => {
  window.initializeUsLabFilters = initialize;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
  function initialize() {
    const root=document.querySelector('.us-lab-filters');
    const form=root?.querySelector('#rfq');
    if(!form || form.dataset.ready) return;
    form.dataset.ready='true';
    const get=id=>root.querySelector('#'+id);
    const catalog=get('catalog'), status=get('form-status'), submit=get('submit-quote');
    const families={
      syringe:{name:'Nonsterile syringe filters',description:'Nylon, PES, PTFE, and PVDF for analytical sample preparation. Specify wettability for PTFE and PVDF.',title:'Nonsterile <em>syringe filters.</em>'},
      sterile:{name:'Sterile syringe filters',description:'PES and PVDF in 13 and 25 mm, plus 30 mm cellulose acetate at 0.22 µm. Ask for the records for your selected SKU.',title:'Sterile <em>syringe filters.</em>'},
      disc:{name:'Plain membrane discs',description:'Choose CA, PES, or MCE at 47 mm, or CA or PES at 142 mm. Both 0.22 and 0.45 µm options are available.',title:'Plain <em>membrane discs.</em>'},
      grid:{name:'Sterile gridded MCE membranes',description:'47 mm, 0.45 µm mixed cellulose ester membranes in white with black grid or black with white grid. Continuous-pack options are listed by catalog number.',title:'Sterile <em>gridded membranes.</em>'}
    };
    const extended = {"capflux": {"name": "CapFlux™ capsules", "description": "Single-use capsules in PP, PES, PTFE, PVDF, or nylon 66.", "industrial": true}, "steriflux": {"name": "SteriFlux™ cartridges", "description": "Pleated and mini cartridges, lenticular filters, and stainless steel elements.", "industrial": true}, "supflux": {"name": "SupFlux™ high-flow cartridges", "description": "P, M, K, A, B, and E series for high-flow systems.", "industrial": true}, "aquaflux": {"name": "AquaFlux™ sediment filters", "description": "Melt-blown, string-wound, bag, carbon, and specialty media.", "industrial": true}, "steelflux": {"name": "SteelFlux™ housings", "description": "Sanitary liquid and gas, high-flow, bag, and membrane housings.", "industrial": true}, "vent": {"name": "Laboratory venting filters", "description": "Vessel venting and air or gas filtration.", "industrial": false}, "glass": {"name": "Glass fiber membranes", "description": "Particulate collection for environmental analysis.", "industrial": false}, "otherlab": {"name": "Other laboratory catalog item", "description": "Other catalog configurations and materials.", "industrial": false}, "process": {"name": "Industrial filters", "description": "Tell us the fluid, flow rate, pressure, temperature, and housing connection so we can identify a configuration.", "industrial": true}};
    const params=new URLSearchParams(location.search);
    const requested=params.get('family')==='industrial'?'process':params.get('family');
    let active=Object.hasOwn(families,requested)||Object.hasOwn(extended,requested)?requested:'syringe';
    let inventory=[];
    function populate(select,rows,compact){
      select.replaceChildren(new Option('Help me choose',''));
      rows.forEach(row=>select.add(new Option(compact?row.id:row.id+' · '+row.description+' · '+row.pack+'/pack',row.id)));
    }
    function chooseFamily(key) {
      active=key;
      const f=families[key]||extended[key], rows=inventory.filter(s=>s.family===key);
      const extra=extended[key];
      get('quote-sku').hidden=Boolean(extra);
      get('quantity-label').textContent=extra?.industrial?'Quantity (individual units)':'Number of packs';
      get('quote-notes').placeholder=extra?.industrial?'Fluid, flow rate, pressure, temperature, connection, existing part number, and required date':extra?'Catalog number, pack details, application, and required arrival date':'Required arrival date, application, additional SKUs, or documents needed';
      form.elements.family.value=key;
      if(catalog)populate(catalog,rows,false);
      populate(form.elements.sku,rows,true);
    }
    if(Object.hasOwn(families,params.get('family'))){
      const f=families[active];get('hero-title').innerHTML=f.title;
      get('hero-copy').textContent=f.description+' Request a US volume quote in USD.';
    }
    if(extended[active]?.industrial){get('hero-title').innerHTML='Industrial <em>process filters.</em>';get('process-range').open=true}
    root.querySelectorAll('[data-range]').forEach(link=>link.addEventListener('click',()=>chooseFamily(link.dataset.range)));
    root.querySelectorAll('[data-open-oem]').forEach(link=>link.addEventListener('click',()=>{get('oem-booking').open=true}));
    root.querySelector('a[href="#industrial"].outline').addEventListener('click',()=>{get('process-range').open=true});
    chooseFamily(active);
    fetch('/us-lab-filters/skus.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(!form.isConnected)return;inventory=data;chooseFamily(active)}).catch(()=>{});
    catalog?.addEventListener('change',()=>{form.elements.sku.value=catalog.value});
    form.elements.family.addEventListener('change',()=>chooseFamily(form.elements.family.value));
    form.elements.sku.addEventListener('change',()=>{if(catalog)catalog.value=form.elements.sku.value});
    get('choose')?.addEventListener('click',()=>{if(extended[active])chooseFamily('syringe');form.elements.sku.value=catalog.value;location.hash='quote';form.elements.name.focus({preventScroll:true})});
    const allRows=[...root.querySelectorAll('[data-pick]')];
    const normalize=text=>text.toLowerCase().replace(/[µμ]/g,'u').replace(/(\d)\s+(mm|um)/g,'$1$2');
    const filterChecks=[...root.querySelectorAll('[data-filter-group]')];
    function applyFilters(){
      const words=normalize(get('catalog-search').value).trim().split(/\s+/).filter(Boolean);
      const chosen={};
      for(const c of filterChecks){if(c.checked)(chosen[c.dataset.filterGroup]??=new Set()).add(c.value)}
      let matches=0;
      for(const link of allRows){
        const row=link.closest('tr');
        const ok=Object.entries(chosen).every(([group,values])=>values.has(row.dataset[group]));
        row.hidden=!ok || !words.every(w=>normalize(row.textContent).includes(w));
        if(!row.hidden)matches++;
      }
      get('catalog-count').textContent=matches ? matches+' catalog number'+(matches===1?'':'s') : 'No matches. Clear a filter or try another search.';
      get('clear-filters').hidden=!Object.keys(chosen).length && !words.length;
    }
    get('catalog-search').addEventListener('input',applyFilters);
    filterChecks.forEach(c=>c.addEventListener('change',applyFilters));
    get('clear-filters').addEventListener('click',()=>{filterChecks.forEach(c=>{c.checked=false});get('catalog-search').value='';applyFilters()});
    applyFilters();
    root.querySelector('.catalog-scroll').addEventListener('click',e=>{
      const link=e.target.closest('[data-pick]');if(!link)return;
      chooseFamily(link.dataset.group);
      if(!inventory.length){form.elements.notes.value=link.dataset.pick+' '+form.elements.notes.value}
      else{form.elements.sku.value=link.dataset.pick;if(catalog)catalog.value=link.dataset.pick}
    });
    fetch('/us-lab-filters/product-photos.json').then(r=>r.ok?r.json():{}).then(config=>{
      root.querySelectorAll('[data-photo-slot]').forEach(slot=>{
        const photo=config[slot.dataset.photoSlot];
        if(!photo || !/^media\/[a-zA-Z0-9._-]+\.(webp|png|jpe?g)$/i.test(photo.file) || !photo.alt)return;
        const image=new Image();
        image.alt=photo.alt;image.onload=()=>{
          slot.replaceChildren(image);slot.classList.add('filled');slot.removeAttribute('aria-hidden');
        };
        image.src='/us-lab-filters/'+photo.file;
      });
    }).catch(()=>{});
    bindSubmission(form,status,submit,false);
    bindSubmission(get('oem-form'),get('oem-status'),get('submit-oem'),true);
    function bindSubmission(target,message,button,isOem){
      let lastSignature='',requestId='',busy=false;
      const buttonText=button.textContent;
      target.addEventListener('submit',async e=>{
        e.preventDefault();if(busy || !target.reportValidity())return;
        busy=true;button.disabled=true;message.textContent='Sending your request…';
        try {
          const body=new URLSearchParams(new FormData(target));
          const signature=body.toString();
          if(signature!==lastSignature){requestId=crypto.randomUUID();lastSignature=signature}
          body.set('id',requestId);
          ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'].forEach(k=>{if(params.get(k))body.set(k,params.get(k).slice(0,250))});
          const response=await fetch(target.dataset.endpoint,{method:'POST',body});
          const result=await response.json();
          if(!response.ok || !result.ok)throw new Error(result.error || 'We could not save your request. Please retry or email us.');
          message.textContent=isOem?'Call request '+result.reference+' received. Our team will email you to agree on the appointment.':'Quote request '+result.reference+' received. Our team will follow up by email.';
          window.dataLayer=window.dataLayer||[];
          window.dataLayer.push({event:isOem?'oem_call_requested':'rfq_saved',rfq_reference:result.reference,product_family:isOem?'oem':active});
          button.textContent='Request received';
          target.addEventListener('input',()=>{button.disabled=false;button.textContent=buttonText;message.textContent=''}, {once:true});
        } catch(error) {message.textContent=error instanceof Error && !/fetch|JSON|Unexpected|network/i.test(error.message)?error.message:'Delivery could not be confirmed. Retry or email info@srisaradiscientific.com.';button.disabled=false}
        finally {busy=false}
      });
    }
  }
})();
