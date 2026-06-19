const STORAGE_KEY = "ayla-probabilities-progress-v1";

const state = {
  view: "home",
  branch: "science",
  moduleId: "counting",
  moduleTab: "lesson",
  openSolutions: {},
  progress: loadProgress(),
};

const branchLabels = {
  science: "علمي",
  literary: "أدبي",
  common: "مشترك",
};

const modules = [
  {
    id: "counting",
    branch: "common",
    title: "تنظيم العد والتجارب العشوائية",
    summary: "لغة التجربة، المآل، الحدث، شجرة الإمكانات، ومبدأ العد.",
    tags: ["أساسيات", "مشترك"],
    lesson: `
      <section class="definition-box">
        <strong>الفكرة المركزية:</strong>
        <p>قبل حساب أي احتمال نحتاج إلى وصف التجربة العشوائية وتنظيم الإمكانات الممكنة دون تكرار أو نسيان.</p>
      </section>
      <section class="lesson-block">
        <h4>مصطلحات أساسية</h4>
        <p>التجربة العشوائية هي تجربة نعرف نتائجها الممكنة ولا نعرف أي نتيجة ستقع قبل إنجازها.</p>
        <div class="math-equation">P(A)= عدد الحالات الملائمة / عدد الحالات الممكنة</div>
      </section>
      <section class="warning-box">
        <strong>تنبيه:</strong>
        <p>هذه الصيغة تستعمل فقط عندما تكون الحالات الممكنة متساوية الاحتمال.</p>
      </section>
    `,
    activities: [
      {
        title: "نشاط: من التجربة إلى الفضاء العيني",
        body: "نرمي قطعة نقدية ثم نرمي نردًا سداسيًا. اكتب فضاء الإمكانات وعدد عناصره.",
        prompts: [
          "ما عدد نتائج قطعة النقد؟",
          "ما عدد نتائج النرد؟",
          "استعمل مبدأ الضرب لحساب عدد الأزواج الممكنة.",
        ],
        solution: "عدد الإمكانات هو 2×6=12. مثال على مآل: (كتابة، 4).",
      },
    ],
    exercises: [
      {
        title: "تمرين سريع",
        statement: "نختار بطاقة من 10 بطاقات مرقمة من 1 إلى 10. احسب احتمال الحصول على عدد زوجي.",
        solution: "الأعداد الزوجية هي 2،4،6،8،10 وعددها 5. إذن P=5/10=1/2.",
      },
    ],
  },
  {
    id: "conditional",
    branch: "common",
    title: "الاحتمال الشرطي والاستقلال",
    summary: "حساب احتمال حدث بشرط وقوع حدث آخر، وتمييز الاستقلال عن التنافي.",
    tags: ["شرطي", "استقلال"],
    lesson: `
      <section class="definition-box">
        <strong>تعريف:</strong>
        <p>إذا كان <span class="math">P(B)&gt;0</span> فإن احتمال <span class="math">A</span> بشرط وقوع <span class="math">B</span> هو:</p>
        <div class="math-equation">P_B(A)=P(A∩B)/P(B)</div>
      </section>
      <section class="property-box">
        <strong>الاستقلال:</strong>
        <p>نقول إن <span class="math">A</span> و <span class="math">B</span> مستقلان إذا كان وقوع أحدهما لا يغير احتمال الآخر.</p>
        <div class="math-equation">P(A∩B)=P(A)P(B)</div>
      </section>
      <section class="warning-box">
        <strong>خطأ شائع:</strong>
        <p>التنافي لا يعني الاستقلال. إذا كان حدثان متنافيين واحتمالاهما غير منعدمين فهما غير مستقلين.</p>
      </section>
    `,
    activities: [
      {
        title: "نشاط: قراءة جدول مزدوج",
        body: "في قسم من 30 تلميذًا: 18 يدرسون الإنجليزية، 12 يدرسون الإسبانية، و6 يدرسون اللغتين. نختار تلميذًا عشوائيًا.",
        prompts: [
          "احسب P(E) و P(S) و P(E∩S).",
          "احسب احتمال أن يدرس الإنجليزية علمًا أنه يدرس الإسبانية.",
          "هل الحدثان مستقلان؟",
        ],
        solution: "P(E)=18/30 و P(S)=12/30 و P(E∩S)=6/30. الاحتمال الشرطي P_S(E)=(6/30)/(12/30)=1/2. وبما أن P(E)=3/5 فليسا مستقلين.",
      },
    ],
    exercises: [
      {
        title: "احتمال شرطي",
        statement: "إذا كان P(A)=0.6 و P(B)=0.5 و P(A∩B)=0.2، احسب P_B(A).",
        solution: "P_B(A)=P(A∩B)/P(B)=0.2/0.5=0.4.",
      },
      {
        title: "اختبار الاستقلال",
        statement: "هل الحدثان مستقلان إذا كان P(A)=0.4 و P(B)=0.3 و P(A∩B)=0.12؟",
        solution: "نحسب P(A)P(B)=0.4×0.3=0.12. إذن الحدثان مستقلان.",
      },
    ],
  },
  {
    id: "trees",
    branch: "literary",
    title: "الأشجار الاحتمالية للأدبي",
    summary: "تمثيل وضعيات الاختيار المتتابع واستعمال قاعدة ضرب الفروع.",
    tags: ["أدبي", "أشجار"],
    lesson: `
      <section class="definition-box">
        <strong>طريقة:</strong>
        <p>في الشجرة الاحتمالية نكتب على كل فرع احتمال الانتقال. احتمال مسار كامل يساوي جداء احتمالات فروعه.</p>
        <div class="math-equation">P(A∩B)=P(A)×P_A(B)</div>
      </section>
      <section class="lesson-block">
        <h4>متى نستعملها؟</h4>
        <p>عند وجود اختيارين أو أكثر على مراحل: صندوقان، سحب متتال، اختبار ثم نتيجة، أو سؤال يحتوي على "بعد ذلك".</p>
      </section>
    `,
    activities: [
      {
        title: "نشاط: سحب كرتين دون إرجاع",
        body: "كيس فيه 3 كرات بيضاء و2 سوداء. نسحب كرتين دون إرجاع.",
        prompts: [
          "ارسم فرعي السحب الأول.",
          "اكتب احتمالات السحب الثاني بعد كرة بيضاء وبعد كرة سوداء.",
          "احسب احتمال الحصول على كرتين من نفس اللون.",
        ],
        solution: "P(WW)=3/5×2/4=3/10 و P(BB)=2/5×1/4=1/10، إذن الاحتمال هو 4/10=2/5.",
      },
    ],
    exercises: [
      {
        title: "شجرة بسيطة",
        statement: "صندوق فيه 4 حمراء و6 زرقاء. نسحب كرتين دون إرجاع. احسب احتمال كرتين حمراوين.",
        solution: "P=4/10×3/9=12/90=2/15.",
      },
    ],
  },
  {
    id: "total-bayes",
    branch: "science",
    title: "الاحتمالات الكلية وبايز",
    summary: "استعمال تجزئة الفضاء العيني للبحث عن احتمال حدث أو عكس الشرط.",
    tags: ["علمي", "بايز"],
    lesson: `
      <section class="definition-box">
        <strong>قانون الاحتمالات الكلية:</strong>
        <p>إذا شكلت الأحداث <span class="math">A_i</span> تجزئة للفضاء، فإن:</p>
        <div class="math-equation">P(B)=Σ P(A_i)P_{A_i}(B)</div>
      </section>
      <section class="property-box">
        <strong>صيغة بايز:</strong>
        <div class="math-equation">P_B(A)=P(A)P_A(B)/P(B)</div>
      </section>
    `,
    activities: [
      {
        title: "نشاط: اختبار طبي",
        body: "مرض يصيب 2% من السكان. إذا كان الشخص مريضًا فالاختبار موجب بنسبة 95%، وإذا كان سليمًا فالاختبار موجب خطأ بنسبة 4%.",
        prompts: [
          "احسب احتمال أن يكون الاختبار موجبًا.",
          "احسب احتمال أن يكون الشخص مريضًا علمًا أن الاختبار موجب.",
          "فسر لماذا النتيجة ليست 95%.",
        ],
        solution: "P(+)=0.02×0.95+0.98×0.04=0.0582. إذن P(مريض | +)=0.019/0.0582≈0.326.",
      },
    ],
    exercises: [
      {
        title: "قانون كلي",
        statement: "آلة A تنتج 60% من القطع ونسبة عيبها 3%. آلة B تنتج 40% ونسبة عيبها 5%. احسب احتمال قطعة معيبة.",
        solution: "P(D)=0.6×0.03+0.4×0.05=0.018+0.02=0.038.",
      },
    ],
  },
  {
    id: "binomial",
    branch: "science",
    title: "القانون الثنائي",
    summary: "تكرار تجربة برنولي مستقلة وحساب احتمال عدد النجاحات.",
    tags: ["علمي", "برنولي"],
    lesson: `
      <section class="definition-box">
        <strong>قانون ثنائي:</strong>
        <p>إذا كررنا تجربة برنولي <span class="math">n</span> مرة مستقلة واحتمال النجاح هو <span class="math">p</span>، فإن المتغير <span class="math">X</span> الذي يحسب عدد النجاحات يتبع:</p>
        <div class="math-equation">X ~ B(n,p)</div>
        <div class="math-equation">P(X=k)=C_n^k p^k(1-p)^(n-k)</div>
      </section>
      <section class="property-box">
        <strong>الأمل والتباين:</strong>
        <div class="math-equation">E(X)=np</div>
        <div class="math-equation">V(X)=np(1-p)</div>
      </section>
    `,
    activities: [
      {
        title: "نشاط: تمييز برنولي",
        body: "نرمي قطعة نقدية غير متوازنة 5 مرات واحتمال ظهور الصورة 0.3.",
        prompts: [
          "ما هي التجربة الواحدة؟",
          "ما هو النجاح؟",
          "ما القانون الذي يتبعه عدد الصور؟",
          "احسب احتمال ظهور صورتين بالضبط.",
        ],
        solution: "X~B(5,0.3). P(X=2)=C_5^2×0.3^2×0.7^3=10×0.09×0.343=0.3087.",
      },
    ],
    exercises: [
      {
        title: "قانون ثنائي",
        statement: "إذا كان X~B(4,0.25)، احسب P(X=1).",
        solution: "P(X=1)=C_4^1×0.25×0.75^3=4×0.25×0.421875=0.421875.",
      },
    ],
  },
  {
    id: "random-variable",
    branch: "science",
    title: "المتغير العشوائي والأمل",
    summary: "قانون احتمال متغير عشوائي، الأمل الرياضي، وتفسيره في المسائل.",
    tags: ["علمي", "أمل"],
    lesson: `
      <section class="definition-box">
        <strong>متغير عشوائي:</strong>
        <p>هو تطبيق يربط كل مآل من تجربة عشوائية بعدد حقيقي.</p>
      </section>
      <section class="property-box">
        <strong>الأمل الرياضي:</strong>
        <div class="math-equation">E(X)=Σ x_i P(X=x_i)</div>
        <p>يمثل القيمة المتوسطة المنتظرة عند تكرار التجربة عددًا كبيرًا من المرات.</p>
      </section>
    `,
    activities: [
      {
        title: "نشاط: لعبة ربح وخسارة",
        body: "ندفع 100 دج للعب. نربح 500 دج إذا ظهر رقم 6 في رمية نرد، ولا نربح شيئًا في غير ذلك.",
        prompts: [
          "حدد قيم الربح الصافي.",
          "اكتب قانون احتمال المتغير X.",
          "احسب E(X) وفسر عدالة اللعبة.",
        ],
        solution: "الربح الصافي هو 400 باحتمال 1/6 و -100 باحتمال 5/6. E(X)=400/6-500/6=-100/6≈-16.67، فاللعبة ليست عادلة للاعب.",
      },
    ],
    exercises: [
      {
        title: "أمل رياضي",
        statement: "متغير X يأخذ القيم 0 و2 و5 باحتمالات 0.2 و0.5 و0.3. احسب E(X).",
        solution: "E(X)=0×0.2+2×0.5+5×0.3=2.5.",
      },
    ],
  },
];

const bacModels = [
  {
    branch: "common",
    title: "قراءة شجرة احتمالية",
    body: "يطلب عادة إكمال فروع الشجرة، حساب احتمال مسار، ثم احتمال حدث مركب.",
    tips: ["اكتب احتمال كل فرع", "اضرب على المسار", "اجمع المسارات المتنافية"],
  },
  {
    branch: "science",
    title: "مسألة قانون ثنائي",
    body: "ابحث عن تكرار مستقل لتجربة لها نتيجتان: نجاح وفشل.",
    tips: ["حدد n و p", "عرّف X", "استعمل صيغة P(X=k)"],
  },
  {
    branch: "literary",
    title: "سحب دون إرجاع",
    body: "الأدبي يركز غالبًا على الشجرة والحالات الملائمة دون رمزية ثقيلة.",
    tips: ["انتبه لتغير المقام", "لا تستعمل قانونًا ثنائيًا عند عدم الإرجاع", "استعمل التبسيط الكسري"],
  },
];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { completed: [], lastModuleId: "counting" };
  } catch {
    return { completed: [], lastModuleId: "counting" };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function activeModules() {
  return modules.filter((module) => module.branch === "common" || module.branch === state.branch);
}

function moduleExercises() {
  return activeModules().flatMap((module) => module.exercises.map((exercise, index) => ({ ...exercise, moduleTitle: module.title, key: `${module.id}-${index}` })));
}

function formatMath(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\^(\([^)]*\)|\{[^}]*\}|[-+]?[A-Za-z0-9.]+)/g, (_, raw) => `<sup>${raw.replace(/[(){}]/g, "")}</sup>`)
    .replace(/_(\([^)]*\)|\{[^}]*\}|[-+]?[A-Za-z0-9.]+)/g, (_, raw) => `<sub>${raw.replace(/[(){}]/g, "")}</sub>`);
}

function enhanceMath(scope = document) {
  scope.querySelectorAll(".math, .math-equation").forEach((node) => {
    if (node.dataset.enhanced || node.querySelector("*")) return;
    node.innerHTML = formatMath(node.textContent);
    node.dataset.enhanced = "true";
  });
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("active", el.id === `${view}View`));
  document.querySelectorAll("[data-view]").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
}

function setBranch(branch) {
  state.branch = branch;
  document.querySelectorAll("[data-branch]").forEach((btn) => btn.classList.toggle("active", btn.dataset.branch === branch));
  if (!activeModules().some((module) => module.id === state.moduleId)) state.moduleId = activeModules()[0].id;
  renderAll();
}

function branchBadge(module) {
  const cls = module.branch === "literary" ? "literary" : module.branch === "common" ? "common" : "";
  return `<span class="badge ${cls}">${branchLabels[module.branch]}</span>`;
}

function renderModules() {
  const grid = document.getElementById("modulesGrid");
  grid.innerHTML = activeModules().map((module) => {
    const done = state.progress.completed.includes(module.id);
    return `
      <article class="module-card ${done ? "done" : ""}">
        <div class="badge-row">${branchBadge(module)}${module.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}</div>
        <h3>${module.title}</h3>
        <p>${module.summary}</p>
        <button class="${done ? "ghost-btn" : "primary-btn"}" type="button" data-open-module="${module.id}">${done ? "مراجعة" : "فتح المحور"}</button>
      </article>
    `;
  }).join("");
}

function renderModuleDetail() {
  const module = modules.find((item) => item.id === state.moduleId) || activeModules()[0];
  const done = state.progress.completed.includes(module.id);
  document.getElementById("moduleDetail").innerHTML = `
    <section class="module-hero">
      <div>
        <span class="kicker">${branchLabels[module.branch]}</span>
        <h2>${module.title}</h2>
        <p>${module.summary}</p>
      </div>
      <button class="${done ? "ghost-btn" : "primary-btn"}" type="button" data-complete-module="${module.id}" ${done ? "disabled" : ""}>${done ? "مكتمل" : "تعليم كمكتمل"}</button>
    </section>
    <nav class="tabs" aria-label="أقسام المحور">
      <button class="tab-btn ${state.moduleTab === "lesson" ? "active" : ""}" type="button" data-module-tab="lesson">الدرس</button>
      <button class="tab-btn ${state.moduleTab === "activities" ? "active" : ""}" type="button" data-module-tab="activities">النشاطات (${module.activities.length})</button>
      <button class="tab-btn ${state.moduleTab === "exercises" ? "active" : ""}" type="button" data-module-tab="exercises">التمارين (${module.exercises.length})</button>
    </nav>
    <section class="reader">
      ${state.moduleTab === "lesson" ? module.lesson : ""}
      ${state.moduleTab === "activities" ? renderActivities(module) : ""}
      ${state.moduleTab === "exercises" ? renderExerciseList(module.exercises, module.id) : ""}
    </section>
  `;
  enhanceMath(document.getElementById("moduleDetail"));
}

function renderActivities(module) {
  return `<section class="activity-list">${module.activities.map((activity, index) => `
    <article class="activity-card">
      <span class="label">نشاط ${index + 1}</span>
      <h3>${activity.title}</h3>
      <p>${activity.body}</p>
      <ol class="question-list">${activity.prompts.map((prompt) => `<li>${prompt}</li>`).join("")}</ol>
      <button class="solution-toggle" type="button" data-solution="${module.id}-activity-${index}">إظهار الحل</button>
      <div class="solution-panel" id="solution-${module.id}-activity-${index}">${activity.solution}</div>
    </article>
  `).join("")}</section>`;
}

function renderExerciseList(exercises, prefix) {
  return `<section class="cards-grid">${exercises.map((exercise, index) => renderExerciseCard(exercise, `${prefix}-exercise-${index}`)).join("")}</section>`;
}

function renderExerciseCard(exercise, key) {
  const open = state.openSolutions[key];
  return `
    <article class="exercise-card">
      <span class="label">${exercise.moduleTitle || "تمرين"}</span>
      <h3>${exercise.title}</h3>
      <p>${exercise.statement}</p>
      <button class="solution-toggle" type="button" data-solution="${key}">${open ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${open ? "open" : ""}" id="solution-${key}">${exercise.solution}</div>
    </article>
  `;
}

function renderPractice() {
  document.getElementById("practiceGrid").innerHTML = moduleExercises().map((exercise) => renderExerciseCard(exercise, `practice-${exercise.key}`)).join("");
}

function renderBac() {
  document.getElementById("bacGrid").innerHTML = bacModels
    .filter((item) => item.branch === "common" || item.branch === state.branch)
    .map((item) => `
      <article class="bac-card">
        <div class="badge-row"><span class="badge ${item.branch === "literary" ? "literary" : item.branch === "common" ? "common" : ""}">${branchLabels[item.branch]}</span></div>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        <ol class="question-list">${item.tips.map((tip) => `<li>${tip}</li>`).join("")}</ol>
      </article>
    `).join("");
}

function renderProgress() {
  const grid = document.getElementById("progressGrid");
  grid.innerHTML = activeModules().map((module) => {
    const done = state.progress.completed.includes(module.id);
    return `
      <article class="module-card ${done ? "done" : ""}">
        <span class="badge ${done ? "common" : ""}">${done ? "مكتمل" : "لم يكتمل"}</span>
        <h3>${module.title}</h3>
        <p>${module.summary}</p>
        <button class="ghost-btn" type="button" data-open-module="${module.id}">فتح</button>
      </article>
    `;
  }).join("");
  const doneCount = activeModules().filter((module) => state.progress.completed.includes(module.id)).length;
  document.getElementById("progressSummary").textContent = `${doneCount} محور مكتمل`;
}

function updateHome() {
  const list = activeModules();
  const done = list.filter((module) => state.progress.completed.includes(module.id)).length;
  const pct = list.length ? Math.round((done / list.length) * 100) : 0;
  const next = list.find((module) => !state.progress.completed.includes(module.id)) || list[0];
  document.getElementById("homeTitle").textContent = state.branch === "science" ? "مسار الاحتمالات للشعب العلمية" : "مسار الاحتمالات للشعب الأدبية";
  document.getElementById("homeSummary").textContent = state.branch === "science"
    ? "يركز على الاحتمال الشرطي، القانون الكلي، القانون الثنائي، والمتغيرات العشوائية."
    : "يركز على تنظيم الإمكانات، الأشجار الاحتمالية، الاحتمال الشرطي، ومسائل السحب.";
  document.getElementById("nextTitle").textContent = next?.title || "كل شيء مكتمل";
  document.getElementById("nextSummary").textContent = next?.summary || "يمكنك مراجعة المحاور أو حل تمارين إضافية.";
  document.getElementById("continueBtn").dataset.openModule = next?.id || list[0]?.id;
  document.getElementById("moduleCount").textContent = list.length;
  document.getElementById("exerciseCount").textContent = moduleExercises().length;
  document.getElementById("activityCount").textContent = list.reduce((sum, module) => sum + module.activities.length, 0);
  document.getElementById("progressValue").textContent = `${pct}%`;
  document.getElementById("progressRing").style.setProperty("--pct", `${pct}%`);
}

function markComplete(moduleId) {
  if (!state.progress.completed.includes(moduleId)) {
    state.progress.completed.push(moduleId);
    state.progress.lastModuleId = moduleId;
    saveProgress();
    renderAll();
  }
}

function renderAll() {
  renderModules();
  renderModuleDetail();
  renderPractice();
  renderBac();
  renderProgress();
  updateHome();
  enhanceMath();
}

document.addEventListener("click", (event) => {
  const viewBtn = event.target.closest("[data-view]");
  if (viewBtn) setView(viewBtn.dataset.view);

  const jumpBtn = event.target.closest("[data-view-jump]");
  if (jumpBtn) setView(jumpBtn.dataset.viewJump);

  const branchBtn = event.target.closest("[data-branch]");
  if (branchBtn) setBranch(branchBtn.dataset.branch);

  const openBtn = event.target.closest("[data-open-module]");
  if (openBtn) {
    state.moduleId = openBtn.dataset.openModule;
    state.progress.lastModuleId = state.moduleId;
    saveProgress();
    state.moduleTab = "lesson";
    renderModuleDetail();
    setView("module");
  }

  const completeBtn = event.target.closest("[data-complete-module]");
  if (completeBtn) markComplete(completeBtn.dataset.completeModule);

  const moduleTab = event.target.closest("[data-module-tab]");
  if (moduleTab) {
    state.moduleTab = moduleTab.dataset.moduleTab;
    renderModuleDetail();
  }

  const solutionBtn = event.target.closest("[data-solution]");
  if (solutionBtn) {
    const key = solutionBtn.dataset.solution;
    state.openSolutions[key] = !state.openSolutions[key];
    const panel = document.getElementById(`solution-${key}`);
    panel?.classList.toggle("open", state.openSolutions[key]);
    solutionBtn.textContent = state.openSolutions[key] ? "إخفاء الحل" : "إظهار الحل";
  }
});

document.getElementById("continueBtn").addEventListener("click", () => {
  const moduleId = document.getElementById("continueBtn").dataset.openModule || state.progress.lastModuleId || activeModules()[0].id;
  state.moduleId = moduleId;
  state.moduleTab = "lesson";
  renderModuleDetail();
  setView("module");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("هل تريد تصفير تقدمك في تطبيق الاحتمالات؟")) return;
  state.progress = { completed: [], lastModuleId: "counting" };
  saveProgress();
  renderAll();
});

renderAll();
