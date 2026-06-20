const STORAGE_KEY = "ayla-probabilities-progress-v1";

const state = {
  view: "home",
  branch: "science",
  moduleId: "counting",
  moduleTab: "lesson",
  openSolutions: {},
  bacTrackFilter: "all",
  bacYearFilter: "الكل",
  bacOpenSolutions: {},
  progress: loadProgress(),
};

const branchLabels = {
  science: "علمي",
  literary: "أدبي",
  common: "مشترك",
};

const bacTrackLabels = {
  all: "كل الشعب",
  experimental: "علوم تجريبية",
  math: "رياضيات",
  technical: "تقني رياضي",
  management: "تسيير واقتصاد",
};

const modules = [
  {
    id: "counting",
    branch: "common",
    title: "الـعـد ( القوائم ، الترتيبات ، التبديلات )",
    summary: "فهم طرق العد الأساسية: القوائم، الترتيبات، والتبديلات، مع التمييز بين وجود التكرار وعدمه.",
    tags: ["الدرس الأول", "مشترك"],
    lesson: `
      <section class="lesson-block">
        <h4>1. قوائم عناصر مجموعة منتهية</h4>
        <p>نسمي قائمة ذات <span class="math">p</span> عنصرًا من مجموعة منتهية <span class="math">E</span>، كل اختيار مرتب مكون من <span class="math">p</span> عنصر من عناصر <span class="math">E</span>.</p>
        <p>إذا كان <span class="math">E</span> تحتوي <span class="math">n</span> عنصرًا، فإن عدد القوائم ذات الطول <span class="math">p</span> يعتمد على السماح بتكرار العنصر أو منعه.</p>
      </section>
      <section class="definition-box">
        <strong>تعريف:</strong>
        <p>لتكن <span class="math">E</span> مجموعة منتهية ذات <span class="math">n</span> عنصرًا، وليكن <span class="math">p</span> عددًا طبيعيًا حيث <span class="math">p >= 1</span>. نسمي قائمة ذات <span class="math">p</span> حدًا من <span class="math">E</span> كل كتابة مرتبة من <span class="math">p</span> عنصر من عناصر <span class="math">E</span>.</p>
      </section>
      <section class="lesson-block">
        <h4>2. التفسير</h4>
        <p>في الحالة الأولى، عندما يكون تكرار العنصر مسموحًا، فإن لكل حد من حدود القائمة <span class="math">n</span> اختيارات ممكنة.</p>
        <div class="math-equation">عدد القوائم = n × n × ... × n = n^p</div>
        <p>في الحالة الثانية، عندما تكون عناصر القائمة متميزة، يكون للحد الأول <span class="math">n</span> اختيارات، وللحد الثاني <span class="math">n-1</span> اختيارات، وهكذا إلى الحد <span class="math">p</span>.</p>
        <div class="math-equation">عدد القوائم دون تكرار = n(n-1)(n-2)...(n-p+1)</div>
      </section>
      <section class="property-box">
        <strong>ملاحظة:</strong>
        <p>تسمى القائمة التي عناصرها متميزة منتهية بترتيبة. ويرمز لعدد الترتيبات ذات <span class="math">p</span> عنصر من بين <span class="math">n</span> عنصر بالرمز:</p>
        <div class="math-equation">A_n^p = n(n-1)(n-2)...(n-p+1)</div>
      </section>
      <section class="property-box">
        <strong>مثال 1:</strong>
        <p>ما عدد الأعداد ذات 3 أرقام، والتي يمكن كتابتها من الأرقام: 1، 2، 3، 4، 5؟</p>
        <p>بما أن تكرار الأرقام مسموح، فإن لدينا 5 اختيارات لكل رقم.</p>
        <div class="math-equation">5 × 5 × 5 = 125</div>
      </section>
      <section class="property-box">
        <strong>مثال 2:</strong>
        <p>ما عدد الأعداد ذات 3 أرقام مختلفة، والتي يمكن كتابتها من الأرقام: 1، 2، 3، 4، 5، 6؟</p>
        <p>هنا لا يسمح بتكرار الرقم، لذلك يكون عدد الاختيارات متناقصًا.</p>
        <div class="math-equation">6 × 5 × 4 = 120</div>
      </section>
      <section class="definition-box">
        <strong>3. تعريف الترتيبة:</strong>
        <p>ترتيبة ذات <span class="math">p</span> عنصر من مجموعة ذات <span class="math">n</span> عنصرًا هي قائمة ذات <span class="math">p</span> عنصر، كل عناصرها مختلفة.</p>
        <div class="math-equation">A_n^p = n(n-1)(n-2)...(n-p+1)</div>
      </section>
      <section class="warning-box">
        <strong>ملاحظة:</strong>
        <p>يمكن كتابة عدد الترتيبات ذات <span class="math">p</span> عنصر من مجموعة ذات <span class="math">n</span> عنصرًا بالشكل:</p>
        <div class="math-equation">A_n^p = n!/(n-p)!</div>
      </section>
      <section class="lesson-block">
        <h4>التوفيقات - دستور ثنائي الحد</h4>
        <p>بعد الترتيبات ندرس التوفيقات، وهي طريقة عد نستعملها عندما نختار عناصر من مجموعة دون الاهتمام بالترتيب.</p>
      </section>
      <section class="definition-box">
        <strong>1. تعريف:</strong>
        <p>لتكن <span class="math">E</span> مجموعة منتهية ذات <span class="math">n</span> عنصرًا، وليكن <span class="math">p</span> عددًا طبيعيًا بحيث <span class="math">0 <= p <= n</span>. نسمي توفيقة من <span class="math">p</span> عنصرًا من <span class="math">E</span> كل جزء من <span class="math">E</span> يحتوي على <span class="math">p</span> عنصر.</p>
        <p>نرمز لعدد التوفيقات ذات <span class="math">p</span> عنصر من مجموعة ذات <span class="math">n</span> عنصرًا بالرمز:</p>
        <div class="math-equation">C_n^p</div>
      </section>
      <section class="property-box">
        <strong>2. مبرهنة:</strong>
        <p>من أجل كل عددين طبيعيين <span class="math">n</span> و <span class="math">p</span> حيث <span class="math">0 <= p <= n</span> لدينا:</p>
        <div class="math-equation">C_n^p = n(n-1)...(n-p+1)/p! = n!/(p!(n-p)!)</div>
        <p>كل توفيقة ذات <span class="math">p</span> عنصر تعطي <span class="math">p!</span> ترتيبة، لذلك نقسم عدد الترتيبات على <span class="math">p!</span>.</p>
      </section>
      <section class="property-box">
        <strong>مثال:</strong>
        <p>نريد تشكيل لجنة من 6 تلاميذ من بين 49 تلميذًا. ما عدد اللجان الممكن تشكيلها؟</p>
        <p>كل لجنة هي توفيقة من 6 عناصر من بين 49 عنصرًا، لأن ترتيب أعضاء اللجنة لا يهم.</p>
        <div class="math-equation">C_49^6 = 49!/(6!43!) = (49×48×47×46×45×44)/(6×5×4×3×2×1) = 13983816</div>
      </section>
      <section class="property-box">
        <strong>3. خواص:</strong>
        <p>من أجل كل عددين طبيعيين <span class="math">n</span> و <span class="math">p</span> حيث <span class="math">0 <= p <= n</span> لدينا:</p>
        <div class="math-equation">C_n^p = C_n^(n-p)</div>
        <p>ومن أجل <span class="math">n >= 1</span> و <span class="math">1 <= p <= n-1</span> لدينا علاقة باسكال:</p>
        <div class="math-equation">C_n^p = C_(n-1)^p + C_(n-1)^(p-1)</div>
      </section>
      <section class="warning-box">
        <strong>مثلث باسكال:</strong>
        <p>يساعد مثلث باسكال على حساب معاملات التوفيق. كل عدد داخلي يساوي مجموع العددين الموجودين فوقه مباشرة.</p>
        <div class="pascal-wrap" aria-label="مثلث باسكال">
          <table class="pascal-table">
            <thead>
              <tr>
                <th><span>p</span><span>n</span></th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
              </tr>
            </thead>
            <tbody>
              <tr><th>0</th><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><th>1</th><td>1</td><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><th>2</th><td>1</td><td>2</td><td>1</td><td></td><td></td><td></td><td></td></tr>
              <tr><th>3</th><td class="pascal-red">1</td><td class="pascal-red">3</td><td>3</td><td>1</td><td></td><td></td><td></td></tr>
              <tr><th>4</th><td>1</td><td class="pascal-red">4</td><td>6</td><td>4</td><td>1</td><td></td><td></td></tr>
              <tr><th>5</th><td>1</td><td>5</td><td>10</td><td class="pascal-blue">10</td><td class="pascal-blue">5</td><td>1</td><td></td></tr>
              <tr><th>6</th><td>1</td><td>6</td><td>15</td><td>20</td><td class="pascal-blue">15</td><td>6</td><td>1</td></tr>
            </tbody>
          </table>
          <div class="pascal-note pascal-note-red">
            <span class="math">C_4^1</span>
            <span>=</span>
            <span class="math">C_3^0</span>
            <span>+</span>
            <span class="math">C_3^1</span>
          </div>
          <div class="pascal-note pascal-note-blue">
            <span class="math">C_6^4</span>
            <span>=</span>
            <span class="math">C_5^3</span>
            <span>+</span>
            <span class="math">C_5^4</span>
          </div>
        </div>
      </section>
      <section class="definition-box">
        <strong>4. دستور ثنائي الحد:</strong>
        <p>إذا كان <span class="math">a</span> و <span class="math">b</span> عددين حقيقيين و <span class="math">n</span> عددًا طبيعيًا، فإن:</p>
        <div class="math-equation">(a+b)^n = Σ_(p=0)^n C_n^p a^(n-p)b^p</div>
        <div class="math-equation">(a+b)^n = a^n + C_n^1 a^(n-1)b + C_n^2 a^(n-2)b^2 + ... + b^n</div>
      </section>
    `,
    activities: [
      {
        title: "نشاط: اختيار الطريقة المناسبة",
        body: "لدينا الأرقام 1، 2، 3، 4، 5. نريد تكوين عدد من ثلاث خانات. قارن بين حالتي السماح بتكرار الرقم ومنع التكرار.",
        prompts: [
          "هل ترتيب الأرقام مهم في تكوين العدد؟",
          "كم عدد الأعداد الممكنة إذا سمحنا بتكرار الرقم؟",
          "كم عدد الأعداد الممكنة إذا منعنا تكرار الرقم؟",
        ],
        solution: "الترتيب مهم لأن 123 يختلف عن 321. مع التكرار: 5^3=125. دون تكرار: A_5^3=5×4×3=60.",
      },
      {
        title: "نشاط: أقطار المضلعات",
        body: "نريد عد أقطار مضلع منتظم. القطر هو كل قطعة تصل بين رأسين غير متجاورين.",
        visual: `
          <svg class="activity-visual polygon-visual" viewBox="0 0 640 220" role="img" aria-label="مضلعات منتظمة">
            <polygon points="92,30 150,72 128,140 56,140 34,72" fill="none" stroke="#315cff" stroke-width="3"></polygon>
            <polygon points="245,38 335,38 335,128 245,128" fill="none" stroke="#ef4444" stroke-width="3"></polygon>
            <polygon points="470,32 535,145 405,145" fill="none" stroke="#ff38e8" stroke-width="3"></polygon>
            <polygon points="92,178 124,160 156,178 156,214 124,232 92,214 60,232 28,214 28,178 60,160" transform="translate(0 -32)" fill="none" stroke="#ff9acb" stroke-width="3"></polygon>
            <polygon points="430,160 485,160 520,202 485,244 430,244 395,202" transform="translate(0 -32)" fill="none" stroke="#35a852" stroke-width="3"></polygon>
          </svg>
        `,
        prompts: [
          "ما عدد أقطار مثلث؟ ومربع؟ ومخمس؟",
          "اختر كل رأس من مضلع له n رؤوس، ثم احذف الرأس نفسه والرأسين المجاورين له. كم اختيارًا يبقى؟",
          "لماذا نقسم العدد على 2 عند حساب عدد الأقطار؟",
          "تحقق من النتيجة من أجل n=3 و n=4 و n=5.",
        ],
        solution: "من كل رأس يمكن وصل n-3 أقطار، فيكون العدد n(n-3). لكن كل قطر حُسب مرتين، لذلك عدد الأقطار هو n(n-3)/2. للمثلث: 3(0)/2=0. للمربع: 4(1)/2=2. للمخمس: 5(2)/2=5.",
      },
      {
        title: "نشاط 4: تكوين أعداد من أرقام مختلفة",
        body: "ما عدد الأعداد التي يمكن تشكيلها باستعمال الأرقام: 1، 2، 3، 4، 5، 6 إذا كانت هذه الأرقام مختلفة؟",
        prompts: [
          "كم عدد الأعداد المكونة من رقم واحد؟",
          "كم عدد الأعداد المكونة من 3 أرقام مختلفة؟",
          "كم عدد الأعداد المكونة من 6 أرقام مختلفة؟",
        ],
        solution: "من رقم واحد: 6 اختيارات. من 3 أرقام مختلفة: A_6^3=6×5×4=120. من 6 أرقام مختلفة: 6!=720.",
      },
      {
        title: "نشاط 5: اختيار طبيبين من قسم",
        body: "يتكون قسم من 20 طبيبًا. نريد اختيار طبيبين من هذا القسم حسب شروط مختلفة.",
        prompts: [
          "احسب عدد طرق اختيار طبيبين من القسم إذا كان الترتيب غير مهم.",
          "احسب عدد طرق اختيار طبيبين بشرط ألا يكون أحدهما رئيسًا والآخر مساعدًا.",
          "احسب عدد طرق اختيار طبيبين بشرط أن يكون أحدهما رئيسًا والآخر مساعدًا.",
          "حدد النتيجة بين الأعداد: a و b و c.",
        ],
        solution: "اختيار طبيبين دون ترتيب: C_20^2=190. إذا كان لأحدهما دور رئيس وللآخر مساعد فالترتيب مهم: A_20^2=20×19=380. إذا كان الاختيار مجرد زوج دون تمييز الدور فهو 190. إذن نقارن حسب معنى الأعداد المعطاة في السؤال.",
      },
    ],
    exercises: [
      {
        title: "تمرين محلول 1",
        statement: "ما عدد الأعداد ذات 3 أرقام مختلفة مثنى مثنى، والتي يمكن تشكيلها باستعمال الأرقام: 2، 3، 5، 6، 7، 9؟ ثم بيّن من هذه الأعداد: ما عدد الأعداد الزوجية؟ ما عدد الأعداد التي تبدأ بـ 5؟ وما عدد الأعداد الأصغر من 500؟",
        solution: "لدينا 6 أرقام ونريد تكوين عدد من 3 أرقام دون تكرار، إذن العدد الكلي هو A_6^3=6×5×4=120. الأعداد الزوجية يجب أن تنتهي بـ 2 أو 6؛ نختار رقم الآحاد بطريقتين، ثم نرتب رقمين من بين 5 أرقام للباقي: 2×A_5^2=2×5×4=40. الأعداد التي تبدأ بـ 5: نثبت رقم المئات 5، ثم نختار رقمين مختلفين من بين 5 أرقام: A_5^2=5×4=20. الأعداد الأصغر من 500 يجب أن تبدأ بـ 2 أو 3؛ إذن عددها 2×A_5^2=40.",
      },
      {
        title: "تمرين محلول 2",
        statement: "ما هو عدد القوائم ذات n عنصر، حيث n >= 1، والتي يمكن تشكيلها من العنصرين: نعم، لا؟ استنتج عدد أجزاء مجموعة ذات n عنصرًا.",
        solution: "لكل عنصر من العناصر n اختياران: إما أن نكتب نعم أو لا. لذلك عدد القوائم هو 2×2×...×2 = 2^n. وإذا اعتبرنا كل جواب نعم يعني أن العنصر ينتمي إلى جزء من المجموعة، وكل جواب لا يعني أنه لا ينتمي، فإن كل قائمة تمثل جزءًا واحدًا من المجموعة. إذن عدد أجزاء مجموعة ذات n عنصر هو 2^n.",
      },
      {
        title: "تمرين محلول 3",
        statement: "ما هو عدد الوضعيات التي يمكن أن يجلس بها 8 أشخاص حول طاولة مستديرة؟",
        solution: "في الترتيب حول طاولة مستديرة، الدورانات المتشابهة لا تعد وضعيات جديدة. لذلك نثبت شخصًا واحدًا، ثم نرتب الأشخاص السبعة الباقين. عدد الوضعيات هو 7! = 5040.",
      },
      {
        title: "تمرين محلول 4",
        statement: "باستعمال الحاسبة، احسب: 9! و 15! و 37!، ثم احسب C_12^3 و C_16^5.",
        solution: "نستعمل مفتاح المضروب ! لحساب: 9! = 362880، و 15! = 1307674368000، و 37! ≈ 1.376375309×10^43. ونستعمل مفتاح nCr لحساب التوفيقات: C_12^3 = 220 و C_16^5 = 4368.",
      },
      {
        title: "تمرين محلول 5",
        statement: "يحتوي صندوق على 5 كريات سوداء و4 كريات بيضاء، وكل الكريات متماثلة لا نميز بينها باللمس. نسحب في آن واحد 3 كريات. ما عدد السحبات الممكنة؟ وما عدد السحبات التي تحتوي كرية سوداء على الأقل؟",
        solution: "عدد الكريات هو 9، وكل سحبة هي توفيقة من 3 عناصر من بين 9 عناصر، إذن عدد السحبات هو C_9^3 = (9×8×7)/(3×2×1) = 84. لحساب السحبات التي تحتوي كرية سوداء على الأقل، نحذف السحبات التي لا تحتوي أي كرية سوداء، أي السحبات التي تحتوي 3 كريات بيضاء فقط. عددها C_4^3 = 4. إذن عدد السحبات المطلوبة هو 84 - 4 = 80."
      },
      {
        title: "تمرين محلول 6",
        statement: "احسب المجموعتين: A = Σ_(k=0)^n C_n^k (1/2)^k و B = Σ_(k=0)^n C_n^k (3^k)/(4^k).",
        solution: "باستعمال دستور ثنائي الحد: A = Σ_(k=0)^n C_n^k 1^(n-k)(1/2)^k = (1 + 1/2)^n = (3/2)^n. وكذلك B = Σ_(k=0)^n C_n^k 1^(n-k)(3/4)^k = (1 + 3/4)^n = (7/4)^n.",
      },
    ],
  },
  {
    id: "random-modeling",
    branch: "common",
    title: "نمذجة تجربة عشوائية",
    summary: "تعريف قانون احتمال على مجموعة المخارج، حساب الأمل والتباين والانحراف المعياري، واستعمال خواص الاحتمال.",
    tags: ["الدرس الثاني", "مشترك"],
    lesson: `
      <section class="definition-box">
        <strong>نمذجة تجربة عشوائية:</strong>
        <p>عندما يكون عدد مخارج تجربة عشوائية منتهيًا، نرمز إلى مجموعة المخارج بالرمز <span class="math">E={x_1,x_2,...,x_r}</span>.</p>
        <p>نعرف قانون احتمال على <span class="math">E</span> بإعطاء أعداد حقيقية <span class="math">p_1,p_2,...,p_r</span> بحيث من أجل كل <span class="math">i</span> لدينا <span class="math">p_i >= 0</span> و:</p>
        <div class="math-equation">Σ_(i=1)^r p_i = 1</div>
        <p>ويكون <span class="math">p_i</span> هو احتمال المخرج <span class="math">x_i</span>.</p>
      </section>
      <section class="property-box">
        <strong>مثال:</strong>
        <p>نحتوي صندوقًا على 6 كريات متماثلة لا نفرق بينها باللمس: 3 كريات تحمل الرقم 1، وكرتان تحملان الرقم 2، وكرة واحدة تحمل الرقم 3. نسحب عشوائيًا كرية واحدة.</p>
        <p>هذه التجربة يمكن نمذجتها بالمخارج <span class="math">E={1,2,3}</span>، واحتمالاتها ليست متساوية.</p>
        <table class="theory-table">
          <thead>
            <tr><th>المخرج <span class="math">x_i</span></th><th>1</th><th>2</th><th>3</th></tr>
          </thead>
          <tbody>
            <tr><th>الاحتمال <span class="math">p_i</span></th><td>1/2</td><td>1/3</td><td>1/6</td></tr>
          </tbody>
        </table>
        <p>مثلًا احتمال الحصول على الرقم 1 هو <span class="math">3/6=1/2</span>، واحتمال الحصول على الرقم 3 هو <span class="math">1/6</span>.</p>
      </section>
      <section class="lesson-block">
        <h4>الأمل، التباين، والانحراف المعياري</h4>
        <p>إذا كان <span class="math">X</span> قانون احتمال على مجموعة مخارج عددية، فإن الأمل الرياضي هو:</p>
        <div class="math-equation">μ = Σ p_i x_i</div>
        <p>والتباين هو:</p>
        <div class="math-equation">V = Σ p_i (x_i - μ)^2</div>
        <p>أما الانحراف المعياري فهو:</p>
        <div class="math-equation">σ = √V</div>
      </section>
      <section class="lesson-block">
        <h4>احتمال حادثة</h4>
        <p>كل جزء من <span class="math">E</span> يسمى حادثة. إذا كان <span class="math">A</span> حادثة، فإن احتمالها هو مجموع احتمالات المخارج التي تحققها.</p>
        <p>في حالة تساوي الاحتمالات نستعمل الصيغة:</p>
        <div class="math-equation">p(A)= عدد عناصر A / عدد عناصر E</div>
      </section>
      <section class="warning-box">
        <strong>خواص مهمة:</strong>
        <table class="theory-table properties-table">
          <thead>
            <tr><th>أجزاء <span class="math">E</span></th><th>لغة الحوادث</th><th>الخاصية</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="math">A</span></td><td>حادثة كيفية</td><td><span class="math">p(A) >= 0</span></td></tr>
            <tr><td><span class="math">∅ ، E</span></td><td>الحادثة المستحيلة والحادثة الأكيدة</td><td><span class="math">p(∅)=0</span> و <span class="math">p(E)=1</span></td></tr>
            <tr><td><span class="math">A ∩ B = ∅</span></td><td><span class="math">A</span> و <span class="math">B</span> حادثتان متنافيتان</td><td><span class="math">p(A ∪ B)=p(A)+p(B)</span></td></tr>
            <tr><td><span class="math">A̅</span></td><td>الحادثة العكسية للحادثة <span class="math">A</span></td><td><span class="math">p(A̅)=1-p(A)</span></td></tr>
            <tr><td><span class="math">A ∪ B</span></td><td><span class="math">A</span> و <span class="math">B</span> حادثتان</td><td><span class="math">p(A ∪ B)=p(A)+p(B)-p(A ∩ B)</span></td></tr>
          </tbody>
        </table>
      </section>
    `,
    activities: [
      {
        title: "نشاط: بناء قانون احتمال",
        body: "في كيس 2 كرتان حمراوان و3 كرات زرقاء وكرة خضراء. نسحب كرة واحدة ونرمز إلى اللون المسحوب.",
        prompts: [
          "اكتب مجموعة المخارج.",
          "أعط احتمال كل مخرج.",
          "تحقق أن مجموع الاحتمالات يساوي 1.",
        ],
        solution: "مجموعة المخارج هي {أحمر، أزرق، أخضر}. الاحتمالات هي: p(أحمر)=2/6=1/3، p(أزرق)=3/6=1/2، p(أخضر)=1/6. والمجموع 1/3+1/2+1/6=1.",
      },
      {
        title: "نشاط: رمي قطعة نقدية أربع مرات",
        body: "نرمي أربع مرات متتابعة قطعة نقدية متوازنة. نرمز لظهور الوجه بـ F ولظهور الظهر بـ P.",
        visual: `
          <svg class="activity-visual coin-visual" viewBox="0 0 520 210" role="img" aria-label="وجها قطعة نقدية">
            <defs>
              <radialGradient id="coinGoldA" cx="35%" cy="30%" r="70%">
                <stop offset="0" stop-color="#fff2a6"></stop>
                <stop offset=".55" stop-color="#d6a83a"></stop>
                <stop offset="1" stop-color="#7b5a1b"></stop>
              </radialGradient>
              <radialGradient id="coinGoldB" cx="35%" cy="30%" r="70%">
                <stop offset="0" stop-color="#f7e7a0"></stop>
                <stop offset=".55" stop-color="#a78535"></stop>
                <stop offset="1" stop-color="#2f2d2b"></stop>
              </radialGradient>
            </defs>
            <text x="155" y="26" class="visual-label">الوجه</text>
            <text x="350" y="26" class="visual-label">الظهر</text>
            <circle cx="170" cy="110" r="62" fill="url(#coinGoldA)" stroke="#6f551e" stroke-width="5"></circle>
            <circle cx="170" cy="110" r="48" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"></circle>
            <text x="170" y="128" text-anchor="middle" class="coin-number">50</text>
            <circle cx="365" cy="110" r="62" fill="url(#coinGoldB)" stroke="#6f551e" stroke-width="5"></circle>
            <circle cx="365" cy="110" r="48" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="3"></circle>
            <path d="M335 110 C350 82, 397 80, 390 119 C382 145, 345 145, 335 120" fill="none" stroke="#47423d" stroke-width="9" stroke-linecap="round"></path>
          </svg>
        `,
        prompts: [
          "اكتب قائمة المخارج الممكنة، وعددها 16 نتيجة.",
          "لتكن A حادثة الحصول على وجهين بالضبط. احسب p(A).",
          "لتكن B حادثة الحصول على ثلاثة أوجه وظهر واحد. احسب p(B).",
          "أي الحادثتين أكثر احتمالًا: A أم B؟",
        ],
        solution: "عدد المخارج هو 2^4=16. الحادثة A تتحقق عند اختيار موضعي الوجهين من بين 4 مواضع، لذلك عدد حالاتها C_4^2=6 ومنه p(A)=6/16=3/8. الحادثة B تتحقق عند اختيار موضع الظهر الوحيد، وعدد حالاتها C_4^1=4 ومنه p(B)=4/16=1/4. إذن A أكثر احتمالًا.",
      },
      {
        title: "نشاط 6: جدول لغتين أجنبيتين",
        body: "يتوزع 400 طالب من الأقسام النهائية في ثانوية ما إلى فوجين A وB، ويدرسون اللغة الحية الأولى: الألمانية أو الإنجليزية. يوضح الجدول عدد الذكور G والإناث F حسب اللغة.",
        visual: `
          <table class="theory-table activity-table">
            <thead><tr><th>اللغة الحية</th><th>إنجليزية A</th><th>ألمانية D</th></tr></thead>
            <tbody>
              <tr><th>ذكور G</th><td>130</td><td>50</td></tr>
              <tr><th>إناث F</th><td>140</td><td>80</td></tr>
            </tbody>
          </table>
        `,
        prompts: [
          "احسب احتمال أن يكون الطالب المختار بنتًا.",
          "ارمز بــ F لحادثة أن يكون الطالب المختار بنتًا، واحسب p(F).",
          "احسب احتمال أن يكون الطالب المختار يدرس الألمانية.",
          "علما أن الطالب المختار بنت، ما احتمال أن تكون تدرس الألمانية؟",
          "قارن النتيجة السابقة مع p(D∩F)/p(F)، حيث D حادثة دراسة الألمانية.",
        ],
        solution: `<table class="theory-table">
          <thead><tr><th>اللغة الحية</th><th>إنجليزية A</th><th>ألمانية D</th></tr></thead>
          <tbody>
            <tr><th>ذكور G</th><td>130</td><td>50</td></tr>
            <tr><th>إناث F</th><td>140</td><td>80</td></tr>
          </tbody>
        </table>
        المجموع هو 400. عدد البنات هو 140+80=220، إذن p(F)=220/400=11/20. عدد دارسي الألمانية هو 50+80=130، إذن p(D)=130/400=13/40. عدد البنات اللواتي يدرسن الألمانية هو 80، إذن p(D∩F)=80/400=1/5. ومنه الاحتمال الشرطي p_F(D)=p(D∩F)/p(F)=(1/5)/(11/20)=4/11.`,
      },
    ],
    exercises: [
      {
        title: "تمرين محلول",
        statement: "نرمي نردًا متوازنًا مرة واحدة. لتكن A حادثة الحصول على عدد زوجي، وB حادثة الحصول على عدد أكبر من 4. احسب p(A)، p(B)، و p(A ∪ B).",
        solution: "لدينا E={1,2,3,4,5,6}. A={2,4,6} إذن p(A)=3/6=1/2. وB={5,6} إذن p(B)=2/6=1/3. كما أن A∩B={6}، لذلك p(A∪B)=p(A)+p(B)-p(A∩B)=1/2+1/3-1/6=2/3.",
      },
      {
        title: "تمرين محلول: اختيار عائلة ذات 5 أطفال",
        statement: "نفرض أنه في مدينة ما احتمال ميلاد ذكر أو أنثى متساويان. نختار عشوائيًا عائلة ذات 5 أطفال. احسب احتمال: 1. وجود 4 ذكور على الأقل، 2. أن يكون عدد الإناث أكبر من عدد الذكور، 3. وجود ثلاثة أطفال على الأقل متتالين من نفس الجنس.",
        solution: "نمثل الذكر بالرمز G والأنثى بالرمز F. عدد الاختيارات الممكنة هو 2^5=32 وكلها متساوية الاحتمال.<br><br>1. لتكن A حادثة وجود 4 ذكور على الأقل. نكتب A=A_1∪A_2 حيث A_1: وجود 4 ذكور وA_2: وجود 5 ذكور. لدينا p(A_1)=C_5^4/2^5=5/32 و p(A_2)=C_5^5/2^5=1/32، إذن p(A)=6/32=3/16.<br><br>2. لتكن B حادثة أن عدد الإناث أكبر من عدد الذكور، وهذا يعني وجود 3 أو 4 أو 5 إناث. إذن p(B)=(C_5^3+C_5^4+C_5^5)/2^5=(10+5+1)/32=16/32=1/2.<br><br>3. لتكن C حادثة وجود ثلاثة أطفال على الأقل متتالين من نفس الجنس. نحسب الحالات الملائمة:<br>• 3 ذكور متتالين على الأقل: عدد التسلسلات التي تحتوي GGG هو 8 (مثل GGGFF، GGFGG، GGGGF، GGGGG، FGGGF، FGGGG، FFGGG، GFGGG).<br>• 3 إناث متتاليات على الأقل: بنفس المنطق 8 تسلسلات.<br>• لا يوجد تسلسل من 5 يحتوي GGG وFFF معًا.<br>إذن عدد الحالات الملائمة هو 8+8=16، و p(C)=16/32=1/2.",
      },
    ],
  },
  {
    id: "random-variable",
    branch: "common",
    title: "المتغير العشوائي، الأمل الرياضي والتباين",
    summary: "تعريف المتغير العشوائي وقانونه الاحتمالي، ثم حساب الأمل الرياضي، التباين، والانحراف المعياري وخواصها.",
    tags: ["الدرس الثالث", "مشترك"],
    lesson: `
      <section class="definition-box">
        <strong>المتغير العشوائي:</strong>
        <p>المتغير العشوائي <span class="math">X</span> هو دالة عددية معرفة على مجموعة المخارج <span class="math">E</span>، ومزودة لاحتمال <span class="math">P</span>.</p>
        <p>إذا أخذ المتغير العشوائي <span class="math">X</span> القيم <span class="math">x_1,x_2,...,x_n</span>، فإن احتمال القيمة <span class="math">x_i</span> هو:</p>
        <div class="math-equation">p_i = p(X=x_i)</div>
        <p>إرفاق كل قيمة <span class="math">x_i</span> بالاحتمال <span class="math">p_i</span> يعرف قانون احتمال جديد على مجموعة القيم، ويسمى قانون المتغير العشوائي <span class="math">X</span>.</p>
      </section>
      <section class="lesson-block">
        <h4>الأمل، التباين، والانحراف المعياري</h4>
        <p>الأمل الرياضي لمتغير عشوائي <span class="math">X</span> هو متوسط قيمه الممكنة مرجحة باحتمالاتها، ويرمز له بالرمز <span class="math">E(X)</span>.</p>
        <div class="math-equation">E(X)=Σ p_i x_i</div>
        <p>التباين يقيس مدى تشتت قيم المتغير العشوائي حول أمله الرياضي، ويرمز له بالرمز <span class="math">Var(X)</span>.</p>
        <div class="math-equation">Var(X)=E((X-E(X))^2)=E(X^2)-(E(X))^2</div>
        <p>الانحراف المعياري هو الجذر التربيعي للتباين:</p>
        <div class="math-equation">σ(X)=√Var(X)</div>
      </section>
      <section class="property-box">
        <strong>خواص الأمل الرياضي والتباين:</strong>
        <p>إذا كان <span class="math">X</span> و <span class="math">Y</span> متغيرين عشوائيين معرفين على نفس الفضاء، و <span class="math">a</span> عددًا حقيقيًا، فإن:</p>
        <div class="math-equation">E(aX)=aE(X)</div>
        <div class="math-equation">E(X+Y)=E(X)+E(Y)</div>
      </section>
      <section class="property-box">
        <strong>خواص ناتجة:</strong>
        <p>إذا كان <span class="math">X</span> متغيرًا عشوائيًا، و <span class="math">a</span> و <span class="math">b</span> عددين حقيقيين، فإن:</p>
        <div class="math-equation">E(X+b)=E(X)+b</div>
        <div class="math-equation">Var(X)=E(X^2)-E(X)^2</div>
        <div class="math-equation">Var(aX)=a^2 Var(X)</div>
        <div class="math-equation">σ(aX)=|a|σ(X)</div>
        <div class="math-equation">Var(X+b)=Var(X)</div>
        <div class="math-equation">σ(X+b)=σ(X)</div>
      </section>
      <section class="warning-box">
        <strong>ملاحظة:</strong>
        <p>يمكن التحقق من هذه الخواص باستعمال حسابات مباشرة انطلاقًا من تعريف الأمل والتباين.</p>
      </section>
    `,
    activities: [
      {
        title: "نشاط: بناء قانون متغير عشوائي",
        body: "نرمي قطعة نقدية مرتين. نربح نقطة عن كل ظهور للصورة، وليكن X عدد الصور المحصل عليها.",
        prompts: [
          "اكتب القيم الممكنة للمتغير X.",
          "احسب احتمال كل قيمة.",
          "احسب E(X).",
        ],
        solution: "القيم الممكنة هي 0، 1، 2. لدينا p(X=0)=1/4، p(X=1)=2/4، p(X=2)=1/4. إذن E(X)=0×1/4+1×2/4+2×1/4=1.",
      },
      {
        title: "نشاط: مقارنة لعبتين",
        body: "يحتوي صندوق على 37 قرصًا لا نميز بينها باللمس، منها 18 قرصًا حمراء. نقارن بين لعبتين باستعمال الربح المتوسط.",
        prompts: [
          "اللعبة الأولى: يدفع اللاعب 10 دنانير ويسحب قرصًا واحدًا. إذا كانت القرصة المسحوبة حمراء يربح 10 دنانير، وإلا يخسر ما دفعه. احسب الربح المتوسط.",
          "اللعبة الثانية: يدفع اللاعب 10 دنانير ويرمي حجر نرد. إذا حصل على الرقم 6 يربح 350 دينارًا، وإلا يخسر ما دفعه. احسب الربح المتوسط.",
          "قارن بين اللعبتين. أيهما أفضل للاعب؟",
        ],
        solution: "في اللعبة الأولى احتمال الفوز 18/37، والربح الصافي عند الفوز 0 دينار إذا اعتبرنا الجائزة 10 تعوض ما دفعه، والخسارة -10. إذن E_1=0×18/37+(-10)×19/37=-190/37≈-5.14. في اللعبة الثانية الربح الصافي عند الفوز 340، واحتماله 1/6، والخسارة -10 واحتمالها 5/6. إذن E_2=340×1/6-10×5/6=290/6≈48.33. اللعبة الثانية أفضل للاعب.",
      },
    ],
    exercises: [
      {
        title: "تمرين محلول",
        statement: "ليكن X متغيرًا عشوائيًا يأخذ القيم 0، 1، 2 باحتمالات 1/4، 1/2، 1/4 على الترتيب. احسب E(X)، Var(X)، و σ(X).",
        solution: "نتحقق أولاً من أن مجموع الاحتمالات يساوي 1: 1/4+1/2+1/4=1 ✓.<br>نحسب E(X)=0×1/4+1×1/2+2×1/4=1. ثم E(X^2)=0^2×1/4+1^2×1/2+2^2×1/4=3/2. إذن Var(X)=E(X^2)-E(X)^2=3/2-1=1/2. وبالتالي σ(X)=√(1/2)."
      },
      {
        title: "تمرين محلول 1",
        statement: "صندوق يحتوي كرتين بيضاوين وكرتين سوداويين. نسحب 3 مرات مع الإرجاع كرة واحدة في كل مرة. نرمز للبيضاء بـ B وللسوداء بـ N. إذا كان سحب الكرة البيضاء يربح 20 دينارًا وسحب الكرة السوداء يخسر 10 دنانير، فليكن X الربح. أوجد قانون احتمال X ثم احسب E(X)، Var(X)، و σ(X).",
        solution: `بما أن السحب مع الإرجاع ولدينا كرتان بيضاوان وكرتان سوداوان، فإن p(B)=p(N)=1/2. القيم الممكنة للربح هي -30، 0، 30، 60.<br>
        <table class="theory-table">
          <thead><tr><th>الربح x_i</th><th>-30</th><th>0</th><th>30</th><th>60</th></tr></thead>
          <tbody><tr><th>p_i=p(X=x_i)</th><td>1/8</td><td>3/8</td><td>3/8</td><td>1/8</td></tr></tbody>
        </table>
        التحقق: 1/8+3/8+3/8+1/8=8/8=1 ✓.<br>
        إذن E(X)=(-30)(1/8)+0(3/8)+30(3/8)+60(1/8)=120/8=15. كما أن Var(X)=1/8(-30-15)^2+3/8(0-15)^2+3/8(30-15)^2+1/8(60-15)^2=5400/8=675. وبالتالي σ(X)=√675≈25.98.`,
      },
      {
        title: "تمرين محلول 2",
        statement: "نرمي 3 أحجار نرد مميزة، مرقمة من 1 إلى 6، ونسجل مجموع الأرقام الظاهرة على الأوجه العلوية. ما هو معدل المجاميع الممكنة؟",
        solution: "ليكن X وY وZ المتغيرات العشوائية التي تمثل الأرقام المحصل عليها على أحجار النرد الثلاثة، وليكن T=X+Y+Z هو المجموع. بما أن كل حجر نرد متوازن، فإن E(X)=E(Y)=E(Z)=(1+2+3+4+5+6)/6=3.5. وباستعمال خاصية خطية الأمل: E(T)=E(X)+E(Y)+E(Z)=3.5+3.5+3.5=10.5.",
      },
    ],
  },
  {
    id: "conditional",
    branch: "common",
    title: "الاحتمالات الشرطية",
    summary: "تعريف الاحتمال الشرطي، استعماله في حساب احتمال تقاطع حادثتين، ثم دستور الاحتمالات الكلية.",
    tags: ["الدرس الرابع", "مشترك"],
    lesson: `
      <section class="definition-box">
        <strong>1. تعريف:</strong>
        <p>لتكن <span class="math">A</span> حادثة من مجموعة المخارج بحيث <span class="math">p(A) ≠ 0</span>. نعرف على <span class="math">E</span> احتمالًا جديدًا نرمز له بالرمز <span class="math">p_A</span> كما يلي:</p>
        <div class="math-equation">p_A(B)=p(A∩B)/p(A)</div>
        <p>حيث من أجل كل حادثة <span class="math">B</span> من <span class="math">E</span>، يسمى <span class="math">p_A(B)</span> احتمال الشرط علمًا أن <span class="math">A</span> محققة، ونكتب أيضًا:</p>
        <div class="math-equation">p_A(B)=p(B/A)</div>
      </section>
      <section class="property-box">
        <strong>مثال:</strong>
        <p>صندوق يحتوي 5 قصاصات مرقمة بالأرقام 0، 2، 4، 6، 8 و3 قصاصات مرقمة بالأرقام 1، 3، 5. لا نميز بينها باللمس. نسحب عشوائيًا وعلى التوالي ودون إرجاع قصاصتين من الصندوق.</p>
        <p>نريد حساب احتمال الحصول على رقمين زوجيين.</p>
        <p>نسمي <span class="math">A</span> حادثة: "القصاصة المسحوبة أولًا تحمل رقمًا زوجيًا"، ونسمي <span class="math">B</span> حادثة: "القصاصة الثانية تحمل رقمًا زوجيًا".</p>
        <div class="math-equation">p(A)=5/8</div>
        <p>إذا تحققت <span class="math">A</span>، فقد بقي في الصندوق 7 قصاصات منها 4 زوجية، لذلك:</p>
        <div class="math-equation">p_A(B)=4/7</div>
        <p>وبالتالي:</p>
        <div class="math-equation">p(A∩B)=p(A)×p_A(B)=5/8×4/7=5/14</div>
      </section>
      <section class="lesson-block">
        <h4>2. دستور الاحتمالات الكلية</h4>
        <p>ليكن <span class="math">A_1,A_2,...,A_n</span> مجموعة حوادث من <span class="math">E</span>. نقول إنها تجزئة للمجموعة الكلية إذا كانت تحقق:</p>
        <div class="math-equation">A_i ≠ ∅</div>
        <div class="math-equation">A_i ∩ A_j = ∅ إذا كان i ≠ j</div>
        <div class="math-equation">A_1 ∪ A_2 ∪ ... ∪ A_n = E</div>
        <div class="partition-diagram" aria-label="تجزئة المجموعة الكلية">
          <span class="partition-part part-1">A₁</span>
          <span class="partition-part part-2">A₂</span>
          <span class="partition-part part-3">A₃</span>
          <span class="partition-part part-4">A₄</span>
          <span class="partition-part part-5">A₅</span>
        </div>
      </section>
      <section class="definition-box">
        <strong>قانون الاحتمالات الكلية:</strong>
        <p>إذا كانت <span class="math">A_1,A_2,...,A_n</span> حوادث تشكل تجزئة للمجموعة الكلية <span class="math">E</span>، فإن من أجل كل حادثة <span class="math">B</span> لدينا:</p>
        <div class="math-equation">p(B)=p(A_1∩B)+p(A_2∩B)+...+p(A_n∩B)</div>
        <p>ومنه:</p>
        <div class="math-equation">p(B)=p(A_1)p_{A_1}(B)+p(A_2)p_{A_2}(B)+...+p(A_n)p_{A_n}(B)</div>
        <p>أي:</p>
        <div class="math-equation">p(B)=Σ_(i=1)^n p(A_i)p_{A_i}(B)</div>
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
      {
        title: "تمرين محلول 1",
        statement: "يحتوي صندوق على 6 كرات حمراء و3 كرات خضراء لا نميز بينها باللمس. نسحب كرتين على التوالي ودون إرجاع. لتكن A الحادثة: الكرة المسحوبة الأولى حمراء، وB الحادثة: الكرة المسحوبة الثانية خضراء. احسب p(A)، p_A(B)، ثم استنتج p(A∩B).",
        solution: "لدينا 9 كرات منها 6 حمراء، إذن p(A)=6/9=2/3. إذا تحققت A، أي سحبنا كرة حمراء أولًا، يبقى في الصندوق 8 كرات منها 3 خضراء، ومنه p_A(B)=3/8. إذن p(A∩B)=p(A)×p_A(B)=2/3×3/8=1/4.",
      },
      {
        title: "تمرين محلول 2: الشجرة الاحتمالية",
        statement: "نعتبر صندوقين: U1 يحتوي على 5 كرات خضراء و3 كرات حمراء، وU2 يحتوي على 3 كرات خضراء و6 كرات حمراء. نرمي حجر نرد غير مزور مرقم من 1 إلى 6. إذا حصلنا على أحد الرقمين 5 أو 6 نسحب كرة من U1، وفي الحالات الأخرى نسحب كرة من U2. نرمز بـ B إلى حادثة الحصول على أحد الرقمين 5 أو 6، وبـ A إلى حادثة الحصول على كرة خضراء. احسب p(B)، p(B̅)، ثم p_B(A)، p_(B̅)(A)، وأخيرًا p(A).",
        solution: "النرد غير مزور، لذلك p(B)=2/6=1/3 و p(B̅)=2/3. إذا تحقق B نسحب من U1، وفيه 5 خضراء من أصل 8، إذن p_B(A)=5/8. إذا تحقق B̅ نسحب من U2، وفيه 3 خضراء من أصل 9، إذن p_(B̅)(A)=1/3. باستعمال دستور الاحتمالات الكلية: p(A)=p(B)p_B(A)+p(B̅)p_(B̅)(A)=1/3×5/8+2/3×1/3=5/24+2/9=31/72.",
      },
    ],
  },
  {
    id: "independent-random-variables",
    branch: "common",
    title: "الحوادث المستقلة والمتغيرات العشوائية المستقلة",
    summary: "تعريف استقلال حادثتين واستقلال متغيرين عشوائيين، مع تطبيق على تكرار رمي حجر نرد.",
    tags: ["الدرس الخامس", "مشترك"],
    lesson: `
      <section class="definition-box">
        <strong>1. تعريف:</strong>
        <p>نقول عن حادثتين <span class="math">A</span> و <span class="math">B</span> إنهما مستقلتان إذا وفقط إذا كان:</p>
        <div class="math-equation">p(A∩B)=p(A)×p(B)</div>
        <p>وإذا كان <span class="math">p(A) ≠ 0</span> فإن هذا يكافئ:</p>
        <div class="math-equation">p(B/A)=p(B)</div>
      </section>
      <section class="definition-box">
        <strong>2. تعريف:</strong>
        <p>ليكن <span class="math">X</span> و <span class="math">Y</span> متغيرين عشوائيين معرفين على نفس الفضاء <span class="math">E</span>.</p>
        <p>لتكن <span class="math">x_1,x_2,...,x_n</span> قيم المتغير <span class="math">X</span> و <span class="math">y_1,y_2,...,y_m</span> قيم المتغير <span class="math">Y</span>.</p>
        <p>نقول إن <span class="math">X</span> و <span class="math">Y</span> مستقلان عندما تكون الحادثتان <span class="math">(X=x_i)</span> و <span class="math">(Y=y_j)</span> مستقلتين من أجل كل <span class="math">i</span> و <span class="math">j</span>.</p>
        <div class="math-equation">p((X=x_i)∩(Y=y_j))=p(X=x_i)p(Y=y_j)</div>
      </section>
      <section class="lesson-block">
        <h4>ملاحظة</h4>
        <p>في دراسة استقلال الحوادث، يكون الحصول على قائمة النتائج أو جدول احتمالات كل النتائج مفيدًا، وخصوصًا في التجارب العشوائية المتكررة.</p>
        <p>تجربتان عشوائيتان مرتبطتان بتجربتين مختلفتين غالبًا تكونان مستقلتين إذا لم تؤثر نتيجة إحداهما في الأخرى.</p>
      </section>
      <section class="property-box">
        <strong>مثال:</strong>
        <p>نرمي حجر نرد غير مزور مرقمًا من 1 إلى 6 عددًا طبيعيًا <span class="math">n</span> من المرات، حيث <span class="math">n >= 1</span>.</p>
        <p>لتكن <span class="math">A</span> الحادثة: "نحصل مرة واحدة على الأقل على الرقم الفردي". احسب احتمال الحادثة <span class="math">A</span>.</p>
        <p>في كل رمية احتمال الحصول على رقم زوجي هو <span class="math">1/2</span>. متممة الحادثة <span class="math">A</span> هي: "لا نحصل على أي رقم فردي"، أي أن كل الرميات زوجية.</p>
        <div class="math-equation">p(A̅)=1/2 × 1/2 × ... × 1/2 = 1/2^n</div>
        <p>ومنه:</p>
        <div class="math-equation">p(A)=1-p(A̅)=1-1/2^n</div>
      </section>
    `,
    activities: [
      {
        title: "نشاط: اختبار الاستقلال",
        body: "نرمي قطعة نقدية ونرمي نردًا متوازنًا. لتكن A حادثة ظهور الصورة، وB حادثة الحصول على عدد زوجي في النرد.",
        prompts: [
          "احسب p(A) و p(B).",
          "احسب p(A∩B).",
          "هل الحادثتان مستقلتان؟",
        ],
        solution: "p(A)=1/2 و p(B)=3/6=1/2. كما أن p(A∩B)=1/2×1/2=1/4، إذن p(A∩B)=p(A)p(B)، وبالتالي A وB مستقلتان.",
      },
    ],
    exercises: [
      {
        title: "تمرين محلول",
        statement: "نرمي حجر نرد متوازن مرتين. لتكن A حادثة الحصول على عدد زوجي في الرمية الأولى، وB حادثة الحصول على عدد أكبر من 4 في الرمية الثانية. هل A وB مستقلتان؟",
        solution: "p(A)=3/6=1/2 و p(B)=2/6=1/3. بما أن الرميتين مستقلتان، فإن p(A∩B)=p(A)p(B)=1/2×1/3=1/6. إذن الحادثتان مستقلتان.",
      },
      {
        title: "تمرين محلول 1",
        statement: "إذا كانت A وB حادثتين مستقلتين، بيّن أن: A و B̅ مستقلتان، A̅ وB مستقلتان، و A̅ و B̅ مستقلتان. ثم في رمي قذيفتين S وT في نفس الوقت نحو هدف، الحادثة S: القذيفة S تصيب الهدف، والحادثة T: القذيفة T تصيب الهدف، وهما مستقلتان واحتمالاهما p(S)=4/5 و p(T)=7/8. احسب احتمال: أ) الهدف يصاب مرتين، ب) الهدف يصاب مرة واحدة، ج) الهدف لا يصاب، د) الهدف يصاب.",
        solution: "بما أن A وB مستقلتان فإن p(A∩B)=p(A)p(B). لدينا p(A∩B̅)=p(A)-p(A∩B)=p(A)-p(A)p(B)=p(A)(1-p(B))=p(A)p(B̅)، إذن A وB̅ مستقلتان. وبنفس الطريقة p(A̅∩B)=p(A̅)p(B). أما p(A̅∩B̅)=1-p(A∪B)=1-[p(A)+p(B)-p(A∩B)]=(1-p(A))(1-p(B))=p(A̅)p(B̅). في مسألة القذيفتين: أ) يصاب مرتين: p(S∩T)=4/5×7/8=7/10. ب) يصاب مرة واحدة: p(S∩T̅)+p(S̅∩T)=4/5×1/8+1/5×7/8=11/40. ج) لا يصاب: p(S̅∩T̅)=1/5×1/8=1/40. د) يصاب: 1-1/40=39/40.",
      },
      {
        title: "تمرين محلول 2",
        statement: "نرمي نردًا خاصًا عبارة عن قطعة نقد متوازنة مرتين. نرمز بـ 1 عند ظهور وجه، وبـ 0 عند ظهور كتابة. ليكن X1 العدد المحصل عليه في الرمية الأولى، وX2 مجموع العددين المحصل عليهما في الرميتين. اكتب قانوني X1 وX2، ثم تحقق أن X1 وX2 غير مستقلين.",
        solution: `قانونا الاحتمال هما:
        <table class="theory-table">
          <thead><tr><th>x₁</th><th>0</th><th>1</th></tr></thead>
          <tbody><tr><th>p(X₁=x₁)</th><td>1/2</td><td>1/2</td></tr></tbody>
        </table>
        <table class="theory-table">
          <thead><tr><th>x₂</th><th>0</th><th>1</th><th>2</th></tr></thead>
          <tbody><tr><th>p(X₂=x₂)</th><td>1/4</td><td>1/2</td><td>1/4</td></tr></tbody>
        </table>
        لكي يكون X₁ وX₂ مستقلين يجب أن تكون الحادثتان (X₁=x₁) و(X₂=x₂) مستقلتين من أجل كل القيم. نأخذ مثلًا الحادثتين (X₁=1) و(X₂=1). لدينا p(X₁=1)=1/2 و p(X₂=1)=1/2، لكن p((X₁=1)∩(X₂=1))=1/4 وهي تساوي في هذه الحالة الجداء. نأخذ الآن (X₁=1) و(X₂=0): التقاطع مستحيل، لذلك p((X₁=1)∩(X₂=0))=0، بينما p(X₁=1)p(X₂=0)=1/2×1/4=1/8. إذن X₁ وX₂ غير مستقلين.`,
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
        solution: "احتمال الكرة الأولى حمراء هو 4/10. بعد سحب كرة حمراء دون إرجاع، يبقى 3 حمراء من أصل 9 كرات. إذن احتمال الكرة الثانية حمراء هو 3/9.<br>P=4/10×3/9=12/90=2/15."
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
        solution: "الآلتان A وB تشكلان تجزئة للفضاء العيني: 0.6+0.4=1 ✓.<br>باستعمال قانون الاحتمالات الكلية:<br>P(D)=P(A)×P_A(D)+P(B)×P_B(D)=0.6×0.03+0.4×0.05=0.018+0.02=0.038."
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
    id: "random-variable-science",
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
        solution: "نتحقق أولاً: 0.2+0.5+0.3=1 ✓.<br>E(X)=0×0.2+2×0.5+5×0.3=0+1+1.5=2.5."
      },
    ],
  },
];

const bacExercises = [
  {
    id: 1,
    track: "experimental",
    year: 2018,
    topic: "الموضوع الأول",
    text: `يحوي صندوق 10 كريات متماثلة لا نفرق بينها باللمس ، منها 4 كريات بيضاء مرقمة بـ: 1 ، 2 ، 2 ، 3 وثلاث كريات حمراء مرقمة بـ : 2 ، 2 ، 3 وثلاث كريات خضراء مرقمة بـ 2 ، 3 ، 3.\nنسحب عشوائيا وفي آن واحد 3 كريات من هذا الصندوق.\nنعتبر الحادثتين:\nA : الكريات الثلاث المسحوبة تحمل ألوان العلم الوطني.\nB : الكريات الثلاث المسحوبة لها نفس الرقم.\n1) أ) احسب احتمالي الحادثتين A و B على الترتيب.\nب) بين أن: P(A ∩ B) = 1/20 ثم استنتج P_A(B) و P(A U B).\n2) ليكن X المتغير العشوائي الذي يرفق بكل نتيجة عملية سحب عدد الكريات التي تحمل رقما فرديا.\nعرف قانون الاحتمال للمتغير العشوائي X واحسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 10 كريات (4 بيضاء: 1,2,2,3؛ 3 حمراء: 2,2,3؛ 3 خضراء: 2,3,3). نسحب 3 كريات في آن واحد؛ C(10,3)=120.</div>

1) أ) حساب P(A) و P(B):
• الحادثة A (ألوان العلم الوطني: بيضاء وحمراء وخضراء):
  P(A) = C(4,1)×C(3,1)×C(3,1) / 120 = 36/120 = 3/10
• الحادثة B (نفس الرقم):
  الأعداد المتاحة هي 2 و3 (لا يوجد 3 كريات تحمل الرقم 1).
  P(B) = (C(5,3)+C(4,3)) / 120 = (10+4)/120 = 14/120 = 7/60

<p class="property-box"><strong>النتيجة:</strong> P(A)=3/10 و P(B)=7/60.</p>

ب) تبيان أن P(A ∩ B) = 1/20:
نريد كريات من الألوان الثلاثة وتحمل نفس الرقم.
• الرقم 2: نختار 2 بيضاء × 2 حمراء × 1 خضراء = C(2,1)×C(2,1)×C(1,1)=4 حالات.
• الرقم 3: نختار 1 بيضاء × 1 حمراء × 2 خضراء = C(1,1)×C(1,1)×C(2,1)=2 حالات.

عدد الحالات الملائمة: 4+2=6
P(A ∩ B) = 6/120 = 1/20

<p class="property-box"><strong>تبيان:</strong> P(A∩B)=1/20 ✓</p>

الاستنتاج:
P_A(B) = P(A∩B) / P(A) = (1/20) / (3/10) = 1/6

P(A∪B) = P(A) + P(B) - P(A∩B)
= 36/120 + 14/120 - 6/120
= 44/120
= 11/30

<p class="property-box"><strong>النتيجة:</strong> P_A(B)=1/6 و P(A∪B)=11/30.</p>

2) المتغير العشوائي X (عدد الكريات الفردية):
الأعداد الفردية هي 1 و3. نعد الكريات الفردية:
• الرقم 1: كرة بيضاء واحدة.
• الرقم 3: كرة بيضاء + كرة حمراء + كريتان خضراوان = 4 كريات.
إذن عدد الكريات الفردية هو 5، وعدد الكريات الزوجية (الرقم 2) هو 5.

قيم X هي: 0، 1، 2، 3.
• P(X=0) = C(5,3)/120 = 10/120 = 1/12
• P(X=1) = C(5,1)×C(5,2)/120 = 5×10/120 = 50/120 = 5/12
• P(X=2) = C(5,2)×C(5,1)/120 = 10×5/120 = 50/120 = 5/12
• P(X=3) = C(5,3)/120 = 10/120 = 1/12

<p class="property-box"><strong>تدقيق:</strong> 1/12+5/12+5/12+1/12=12/12=1 ✓</p>

الأمل الرياضي:
E(X) = 0×(1/12) + 1×(5/12) + 2×(5/12) + 3×(1/12)
= (0+5+10+3)/12
= 18/12
= 3/2

<p class="property-box"><strong>النتيجة:</strong> E(X)=3/2.</p>`
  },
  {
    id: 2,
    track: "experimental",
    year: 2019,
    topic: "الموضوع الأول",
    text: `يحتوي كيس على خمس كريات حمراء منها اربع كريات تحمل الرقم 1 وكرية واحدة تحمل الرقم 2 و سبع كريات خضراء منها اربع كريات تحمل الرقم 1 و ثلاث كريات تحمل الرقم 2 (كل الكريات متماثلة).\nنسحب عشوائيا كريتين من الكيس في آن واحد و نعتبر الحادثتين A و B حيث : \nA : سحب كرتين من نفس اللون.\nB : سحب كرتين تحملان نفس الرقم.\n1) بين ان احتمال الحادثة A هو P(A) = 31/66 و احسب احتمال الحادثة B.\n2) علما ان الكريتين المسحوبتين من نفس اللون, ما احتمال ان تحمل نفس الرقم ؟\n3) ليكن X المتغير العشوائي الذي يرفق بكل عملية سحب عدد الكريات الحمراء المتبقية في الكيس.\nعرف قانون الاحتمال للمتغير العشوائي X واحسب امله الرياضياتي E(X).`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 12 كرة (5 حمراء: أربع 1 وواحدة 2؛ 7 خضراء: أربع 1 وثلاث 2). نسحب كرتين في آن واحد؛ C(12,2)=66.</div>

1) تبيان P(A) وحساب P(B):
• الحادثة A (نفس اللون):
  P(A) = (C(5,2)+C(7,2)) / 66 = (10+21)/66 = 31/66

<p class="property-box"><strong>تبيان:</strong> P(A)=31/66 ✓</p>

• الحادثة B (نفس الرقم):
  P(B) = (C(8,2)+C(4,2)) / 66 = (28+6)/66 = 34/66 = 17/33

2) الاحتمال الشرطي P_A(B):
A∩B يعني كرتين من نفس اللون وتحملان نفس الرقم.
• حمراوين تحملان الرقم 1: C(4,2)=6
• خضراوين تحملان الرقم 1: C(4,2)=6
• خضراوين تحملان الرقم 2: C(3,2)=3

عدد الحالات الملائمة: 6+6+3=15
P(A∩B) = 15/66 = 5/22

P_A(B) = P(A∩B) / P(A) = (15/66) / (31/66) = 15/31

<p class="property-box"><strong>النتيجة:</strong> P_A(B)=15/31.</p>

3) المتغير العشوائي X (عدد الكريات الحمراء المتبقية):
في البداية يوجد 5 كرات حمراء. إذا سحبنا Y كرة حمراء فإن X=5-Y.
قيم X هي: 3، 4، 5.
• P(X=5) = P(Y=0) = C(7,2)/66 = 21/66 = 7/22
• P(X=4) = P(Y=1) = C(5,1)×C(7,1)/66 = 35/66
• P(X=3) = P(Y=2) = C(5,2)/66 = 10/66 = 5/33

<p class="property-box"><strong>تدقيق:</strong> 21/66+35/66+10/66=66/66=1 ✓</p>

الأمل الرياضي:
E(X) = 3×(10/66) + 4×(35/66) + 5×(21/66)
= (30+140+105)/66
= 275/66

<p class="property-box"><strong>النتيجة:</strong> E(X)=275/66.</p>

<p class="definition-box"><strong>تحقق بديل:</strong> E(X)=5-E(Y) حيث Y عدد الكريات الحمراء المسحوبة. وبما أن Y~Hypergeometric(N=12,K=5,n=2)، فإن E(Y)=nK/N=2×5/12=5/6. إذن E(X)=5-5/6=25/6=275/66 ✓</p>`
  },
  {
    id: 3,
    track: "experimental",
    year: 2020,
    topic: "الموضوع الثاني",
    text: `كيس به 3 كريات بيضاء و كريتين حمراوين لا نميز بينها عند اللمس ، نسحب عشوائيا كريتين على التوالي من الكيس بالكيفية التالية :\nإذا كانت الكرية المسحوبة بيضاء نعيدها الى الكيس واذا كانت حمراء لا نعيدها الى الكيس.\n1) أ) شكل شجرة الاحتمالات (B: بيضاء، R: حمراء).\nب) احسب احتمال ان تكون الكرة المسحوبة الثانية حمراء.\n2) ليكن X المتغير العشوائي الذي يرفق بكل سحب لكرتين عدد الكريات الحمراء المسحوبة.\nأ) عين مجموعة قيم المتغير العشوائي X.\nب) برر أن P(X=1) = 27/50 ثم عرف قانون احتمال المتغير العشوائي X.\nج) أحسب E(X) الأمل الرياضياتي.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 620 330" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2020 علوم تجريبية الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2020ExperimentalTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2020ExperimentalTopic2)"></line>
        <text x="118" y="103">----</text>
        <text x="118" y="235">----</text>
        <text x="320" y="58">----</text>
        <text x="320" y="130">2/5</text>
        <text x="320" y="208">3/4</text>
        <text x="320" y="280">----</text>
        <text x="228" y="84">B</text>
        <text x="228" y="255">R</text>
        <text x="462" y="59">B</text>
        <text x="462" y="129">R</text>
        <text x="462" y="209">B</text>
        <text x="462" y="279">R</text>
      </svg>
    `,    solution: `<div class="definition-box"><strong>البيانات:</strong> 3 كريات بيضاء و2 حمراء. نسحب كريتين على التوالي؛ إذا ظهرت بيضاء نعيدها، وإذا ظهرت حمراء لا نعيدها.</div>
<svg class="bac-tree" viewBox="0 0 620 330" role="img" aria-label="الشجرة المكتملة لبكالوريا 2020 علوم تجريبية الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2020ExperimentalTopic2Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2020ExperimentalTopic2Solved)"></line>
  <text x="118" y="103">3/5</text>
  <text x="118" y="235">2/5</text>
  <text x="320" y="58">3/5</text>
  <text x="320" y="130">2/5</text>
  <text x="320" y="208">3/4</text>
  <text x="320" y="280">1/4</text>
  <text x="228" y="84">B</text>
  <text x="228" y="255">R</text>
  <text x="462" y="59">B</text>
  <text x="462" y="129">R</text>
  <text x="462" y="209">B</text>
  <text x="462" y="279">R</text>
</svg>

1) أ) مسارات الشجرة:
• السحبة الأولى:
  P(B)=3/5 ، P(R)=2/5
• السحبة الثانية إذا كانت الأولى بيضاء (تُعاد، لا يتغير التكوين):
  P_B(B)=3/5 ، P_B(R)=2/5
• السحبة الثانية إذا كانت الأولى حمراء (لا تُعاد، يبقى 3 بيضاء و1 حمراء):
  P_R(B)=3/4 ، P_R(R)=1/4

ب) احتمال أن تكون الكرة الثانية حمراء:
P(R2) = P(B)×P_B(R) + P(R)×P_R(R)
= 3/5×2/5 + 2/5×1/4
= 6/25 + 1/10
= 12/50 + 5/50
= 17/50

<p class="property-box"><strong>النتيجة:</strong> P(R2)=17/50.</p>

2) أ) قيم المتغير X:
X هو عدد الكريات الحمراء المسحوبة. إذن:
X(Ω)={0, 1, 2}

ب) تبرير P(X=1):
P(X=1) = P(B∩R) + P(R∩B)
= 3/5×2/5 + 2/5×3/4
= 6/25 + 3/10
= 12/50 + 15/50
= 27/50

<p class="property-box"><strong>تبيان:</strong> P(X=1)=27/50 ✓</p>

قانون الاحتمال:
• P(X=0) = P(B∩B) = 3/5×3/5 = 9/25
• P(X=1) = 27/50
• P(X=2) = P(R∩R) = 2/5×1/4 = 1/10

<p class="property-box"><strong>تدقيق:</strong> 9/25+27/50+1/10 = 18/50+27/50+5/50 = 50/50=1 ✓</p>

ج) الأمل الرياضي:
E(X) = 0×(9/25) + 1×(27/50) + 2×(1/10)
= 27/50 + 1/5
= 27/50 + 10/50
= 37/50

<p class="property-box"><strong>النتيجة:</strong> E(X)=37/50.</p>`
  },
  {
    id: 4,
    track: "experimental",
    year: 2021,
    topic: "الموضوع الأول",
    text: `يراد تشكيل بطريقة عشوائية لجنة تتكون من عضوين من بين ثلاثة رجال (H1, H2, H3) وامرأتين (F1, F2).\nنعتبر الحوادث A, B, C حيث:\nA: "عضوا اللجنة من نفس الجنس"\nB: "عضوا اللجنة من جنسين مختلفين"\nC: "H1 عضو في اللجنة"\n1) أ) أحسب احتمالي الحادثين A و B.\nب) بين ان احتمال الحدث C يساوي 2/5.\n2) المتغير العشوائي X يرفق بكل إمكانية اختيار لعضوين عدد الرجال في اللجنة.\nأ) برر أن مجموعة قيم X هي {0, 1, 2}.\nب) عين قانون احتمال المتغير العشوائي X واحسب أمله الرياضياتي E(X).`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 5 أشخاص (3 رجال وامرأتان). نختار عضوين للجنة؛ عدد الاختيارات C(5,2)=10.</div>

1) أ) حساب P(A) و P(B):
• الحادثة A (نفس الجنس):
  P(A) = (C(2,2)+C(3,2)) / 10 = (1+3)/10 = 4/10 = 2/5
• الحادثة B (جنسين مختلفين):
  P(B) = C(2,1)×C(3,1) / 10 = 6/10 = 3/5

<p class="property-box"><strong>تدقيق:</strong> P(A)+P(B)=2/5+3/5=1 ✓ (A وB متنافيان ومجتمعتهما Ω)</p>

ب) تبيان P(C) = 2/5:
الحادثة C: H1 عضو في اللجنة.
نثبت H1 ثم نختار العضو الثاني من بين 4 أشخاص متبقين:
عدد الحالات = C(4,1)=4
P(C) = 4/10 = 2/5

<p class="property-box"><strong>تبيان:</strong> P(C)=2/5 ✓</p>

2) المتغير العشوائي X (عدد الرجال في اللجنة):
أ) القيم الممكنة:
• X=0: امرأتان.
• X=1: رجل وامرأة.
• X=2: رجلان.
إذن X(Ω)={0,1,2}

ب) قانون الاحتمال:
• P(X=0) = C(2,2)/10 = 1/10
• P(X=1) = C(2,1)×C(3,1)/10 = 6/10 = 3/5
• P(X=2) = C(3,2)/10 = 3/10

<p class="property-box"><strong>تدقيق:</strong> 1/10+3/5+3/10 = 1/10+6/10+3/10=10/10=1 ✓</p>

الأمل الرياضي:
E(X) = 0×(1/10) + 1×(3/5) + 2×(3/10)
= 0 + 6/10 + 6/10
= 12/10
= 6/5

<p class="property-box"><strong>النتيجة:</strong> E(X)=6/5.</p>`
  },
  {
    id: 5,
    track: "experimental",
    year: 2024,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 11 كرية متماثلة لا نفرق بينها باللمس موزعة كما يلي:
كريتان بيضاوان مرقمتان بـ: 1، 3.
وأربع كريات حمراء مرقمة بـ: 0، 1، 1، 3.
وخمس كريات خضراء مرقمة بـ: 0، 1، 1، 3، 4.

I) نسحب عشوائيا وفي آن واحد 3 كريات من الكيس ونعتبر الحوادث الآتية:
A: "الحصول على 3 كريات من نفس اللون"
B: "الحصول على 3 كريات جداء أرقامها عدد فردي"
C: "الحصول على 3 كريات جداء أرقامها عدد زوجي"

1) أ) احسب احتمال الحادثة A وبين أن P(B)=56/165 ثم استنتج P(C).
ب) احسب الاحتمال الشرطي P_A(B).

2) X المتغير العشوائي الذي يرفق بكل عملية سحب لثلاث كريات عدد الكريات التي تحمل رقما زوجيا.
أ) عين قانون الاحتمال للمتغير العشوائي X ثم احسب أمله الرياضي E(X).
ب) احسب احتمال الحادثة (X>1).

II) نسحب الآن من الكيس عشوائيا 3 كريات على التوالي ودون إرجاع.
احسب احتمال الحادثة D: "الحصول على 3 كريات جداء أرقامها معدوم".`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 11 كرية: 2 بيضاء (1،3)، 4 حمراء (0،1،1،3)، 5 خضراء (0،1،1،3،4). عند سحب 3 كريات في آن واحد يكون عدد الحالات الكلية C(11,3)=165.</div>

I) 1) أ) حساب P(A) و P(B) و P(C):

الحادثة A: الحصول على 3 كريات من نفس اللون.
لا يمكن أخذ 3 بيضاء لأن عدد البيضاء 2 فقط.

P(A)=[C(4,3)+C(5,3)]/C(11,3)
=(4+10)/165
=14/165

الحادثة B: جداء الأرقام فردي.
حتى يكون الجداء فرديا يجب أن تكون الأرقام الثلاثة كلها فردية.
عدد الكريات ذات الأرقام الفردية هو 8:
البيضاء 2، الحمراء 3، الخضراء 3.

P(B)=C(8,3)/C(11,3)
=56/165

<p class="property-box"><strong>تبيان:</strong> P(B)=56/165.</p>

الحادثة C: جداء الأرقام زوجي، وهي متممة B.

P(C)=1-P(B)
=1-56/165
=109/165

<p class="property-box"><strong>النتائج:</strong> P(A)=14/165 و P(C)=109/165.</p>

ب) حساب P_A(B):

A∩B يعني: 3 كريات من نفس اللون وجداء أرقامها فردي.

• الحمراء الفردية: 1،1،3، إذن C(3,3)=1.
• الخضراء الفردية: 1،1،3، إذن C(3,3)=1.
• البيضاء الفردية كريتان فقط، فلا تكفي لاختيار 3.

P(A∩B)=2/165

P_A(B)=P(A∩B)/P(A)
=(2/165)/(14/165)
=1/7

<p class="property-box"><strong>النتيجة:</strong> P_A(B)=1/7.</p>

I) 2) المتغير العشوائي X:
الأرقام الزوجية الموجودة هي 0 و4. عدد الكريات التي تحمل رقما زوجيا هو 3: الحمراء 0، والخضراء 0 و4.
وعدد الكريات ذات الأرقام الفردية هو 8.

قيم X هي: 0، 1، 2، 3.

P(X=0)=C(8,3)/C(11,3)=56/165
P(X=1)=C(3,1)C(8,2)/C(11,3)=84/165
P(X=2)=C(3,2)C(8,1)/C(11,3)=24/165
P(X=3)=C(3,3)/C(11,3)=1/165

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=56/165، P(X=1)=84/165، P(X=2)=24/165، P(X=3)=1/165.</p>

E(X)=0×56/165 + 1×84/165 + 2×24/165 + 3×1/165
=(84+48+3)/165
=135/165
=9/11

<p class="property-box"><strong>النتيجة:</strong> E(X)=9/11.</p>

ب) احتمال الحادثة X>1:

P(X>1)=P(X=2)+P(X=3)
=24/165+1/165
=25/165
=5/33

<p class="property-box"><strong>النتيجة:</strong> P(X>1)=5/33.</p>

II) نسحب 3 كريات على التوالي دون إرجاع.
الحادثة D: جداء الأرقام معدوم، أي يظهر الرقم 0 مرة واحدة على الأقل.
في الكيس كريتان تحملان الرقم 0 من أصل 11، إذن عدد الكريات غير الصفرية هو 9.

نحسب بالمتممة:

P(D)=1-P(عدم ظهور أي 0)
=1-[C(9,3)/C(11,3)]
=1-84/165
=81/165
=27/55

<p class="property-box"><strong>النتيجة:</strong> P(D)=27/55.</p>`
  },
  {
    id: 6,
    track: "math",
    year: 2025,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)\n\nيحتوي الصندوق U1 على 12 كرية منها: 3 كريات حمراء، 4 كريات بيضاء، و5 كريات خضراء.\nويحتوي الصندوق U2 على 7 كريات منها: 4 كريات حمراء و3 كريات بيضاء.\n(جميع الكريات متماثلة ولا نفرق بينها باللمس).\n\nنرمي نردا غير مزيف ذا 6 أوجه مرقمة بـ: 1، 1، 1، 1، 2، 2.\n- إذا ظهر الرقم 1، نسحب عشوائيا 3 كريات في آن واحد من U1.\n- وإذا ظهر الرقم 2، نسحب عشوائيا 3 كريات على التوالي من U2 دون إرجاع.\n\nنعتبر الحوادث:\nA: "ظهور الرقم 1"\nB: "الحصول على 3 كريات من نفس اللون"\nC: "الحصول على 3 كريات مختلفة الألوان مثنى مثنى"\nD: "الحصول على كرتين بالضبط من نفس اللون"\n\n1) أنقل وأكمل شجرة الاحتمالات المقابلة.\n2) أ) احسب احتمالات الحوادث B، C، D، ثم P(B∪C).\n   ب) بين أن: P(A∩B̅) = 41/66.\n   ج) احسب P_B̅(A) (احتمال سحب 3 كريات من U1 علمًا أنها ليست من نفس اللون).\n3) ليكن X المتغير العشوائي الذي يرافق كل عملية سحب 3 كريات كما سبق، عدد الألوان التي تحملها الكريات المسحوبة.\n   عيّن قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 500 250" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2025 رياضيات">
        <defs>
          <marker id="bacTreeArrow2025Math" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="125" x2="180" y2="70" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="35" y1="125" x2="180" y2="185" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="200" y1="70" x2="355" y2="35" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="200" y1="70" x2="355" y2="70" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="200" y1="70" x2="355" y2="105" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="200" y1="185" x2="355" y2="155" marker-end="url(#bacTreeArrow2025Math)"></line>
        <line x1="200" y1="185" x2="355" y2="215" marker-end="url(#bacTreeArrow2025Math)"></line>
        <text x="100" y="82" class="tree-prob">P(A)=2/3</text>
        <text x="100" y="190" class="tree-prob">P(A̅)=1/3</text>
        <text x="258" y="38" class="tree-prob">P_A(B)=3/44</text>
        <text x="258" y="74" class="tree-prob">P_A(C)=3/11</text>
        <text x="258" y="112" class="tree-prob">P_A(D)=29/44</text>
        <text x="258" y="158" class="tree-prob">P_A̅(B)=1/7</text>
        <text x="258" y="222" class="tree-prob">P_A̅(D)=6/7</text>
        <text x="188" y="76" class="tree-node">A</text>
        <text x="184" y="192" class="tree-node">A̅</text>
        <text x="370" y="40" class="tree-node">B</text>
        <text x="370" y="76" class="tree-node">C</text>
        <text x="370" y="111" class="tree-node">D</text>
        <text x="370" y="160" class="tree-node">B</text>
        <text x="370" y="221" class="tree-node">D</text>
      </svg>
    `,
    solution: `1) إكمال شجرة الاحتمالات:\nالنرد له 6 أوجه: 1،1،1،1،2،2. إذن:\nP(A) = 4/6 = 2/3 ، P(A̅) = 1/3\n\n• إذا ظهر الرقم 1 (السحب من U1):\nعدد الحالات الكلية: C(12,3) = 220\nP_A(B) = [C(3,3)+C(4,3)+C(5,3)] / 220 = (1+4+10)/220 = 15/220 = 3/44\nP_A(C) = [C(3,1)×C(4,1)×C(5,1)] / 220 = 60/220 = 3/11\nP_A(D) = 1 - P_A(B) - P_A(C) = 1 - 3/44 - 3/11 = 29/44\n\n• إذا ظهر الرقم 2 (السحب من U2):\nعدد الحالات الكلية: C(7,3) = 35\nP_A̅(B) = [C(4,3)+C(3,3)] / 35 = (4+1)/35 = 5/35 = 1/7\nP_A̅(C) = 0 (U2 يحتوي لونين فقط)\nP_A̅(D) = 1 - 1/7 - 0 = 6/7\n\n2) أ) حساب الاحتمالات:\nP(B) = P(A)×P_A(B) + P(A̅)×P_A̅(B) = (2/3)(3/44) + (1/3)(1/7) = 1/22 + 1/21 = 43/462\nP(C) = P(A)×P_A(C) + P(A̅)×P_A̅(C) = (2/3)(3/11) + (1/3)(0) = 2/11\nP(D) = P(A)×P_A(D) + P(A̅)×P_A̅(D) = (2/3)(29/44) + (1/3)(6/7) = 29/66 + 2/7 = 335/462\nP(B∪C) = P(B) + P(C) = 43/462 + 2/11 = 43/462 + 84/462 = 127/462\n(لأن B و C متنافيان)\n\n<p class="property-box"><strong>تدقيق:</strong> P(B)+P(C)+P(D)=43/462+84/462+335/462=462/462=1 ✓</p>\n\nب) حساب P(A∩B̅):\nP(A∩B̅) = P(A) × P_A(B̅) = (2/3) × (1 - 3/44) = (2/3) × (41/44) = 41/66\n\nج) حساب P_B̅(A):\nP_B̅(A) = P(A∩B̅) / P(B̅) = (41/66) / (1 - 43/462) = (41/66) / (419/462) = 287/419\n\n3) المتغير العشوائي X (عدد الألوان):\nX يأخذ القيم 1، 2، 3 حيث:\nX=1 يوافق B، X=2 يوافق D، X=3 يوافق C\nP(X=1) = P(B) = 43/462\nP(X=2) = P(D) = 335/462\nP(X=3) = P(C) = 2/11 = 84/462\n\n<p class="property-box"><strong>تدقيق:</strong> 43/462+335/462+84/462=462/462=1 ✓</p>\n\nالأمل الرياضي:\nE(X) = 1×(43/462) + 2×(335/462) + 3×(84/462) = (43 + 670 + 252)/462 = 965/462\n\n<p class="property-box"><strong>النتيجة:</strong> E(X)=965/462.</p>`
  },
  {
    id: 7,
    track: "math",
    year: 2024,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق U1 على 5 بطاقات متماثلة مرقمة بـ: 1، 1، 2، 3، 3.
ويحتوي صندوق U2 على 6 كريات متماثلة مرقمة كما يلي: 4 كريات حمراء و2 كريتان خضراوان.

نسحب عشوائيًا بطاقة واحدة من الصندوق U1:
إذا تحصلنا على الرقم 1 نسحب عشوائيًا من U2 كرية واحدة.
إذا تحصلنا على الرقم 2 نسحب عشوائيًا من U2 كريتين في آن واحد.
إذا تحصلنا على الرقم 3 نسحب عشوائيًا من U2 ثلاث كريات في آن واحد.

نعتبر الحوادث الآتية، حيث i من {1,2,3}:
C_i: البطاقة المتحصل عليها تحمل الرقم i.
A: الحصول على كريات حمراء فقط.
B: الحصول على كريات خضراء فقط.
D: الحصول على كريات ليست كلها من نفس اللون.

1) أ) بيّن أن P(C1)=2/5 و P(C2)=1/5 و P_C1(A)=2/3.
ب) أنقل وأكمل شجرة الاحتمالات المقابلة.
ج) احسب P(A)، P(B)، P(D).
2) احسب احتمال أن تكون البطاقة المتحصل عليها تحمل الرقم 3 علمًا أن الكريات المسحوبة حمراء.
3) المتغير العشوائي X الذي يرفق بكل عملية سحب عدد الألوان المتحصل عليها.
عين قانون احتمال المتغير العشوائي X ثم احسب الأمل الرياضي E(75X+1917).
4) إذا كان عدد الكريات الحمراء في الصندوق U2 هو n+4 حيث n عدد طبيعي، جد قيمة n التي من أجلها يكون P_C3(A)=7/15.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 520 300" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2024 رياضيات">
        <defs>
          <marker id="bacTreeArrow2024Math" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="150" x2="170" y2="70" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="35" y1="150" x2="170" y2="150" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="35" y1="150" x2="170" y2="230" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="70" x2="350" y2="40" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="70" x2="350" y2="100" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="150" x2="350" y2="120" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="150" x2="350" y2="150" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="150" x2="350" y2="180" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="230" x2="350" y2="205" marker-end="url(#bacTreeArrow2024Math)"></line>
        <line x1="195" y1="230" x2="350" y2="255" marker-end="url(#bacTreeArrow2024Math)"></line>
        <text x="178" y="77" class="tree-node">C₁</text>
        <text x="178" y="157" class="tree-node">C₂</text>
        <text x="178" y="237" class="tree-node">C₃</text>
        <text x="365" y="46" class="tree-node">A</text>
        <text x="365" y="106" class="tree-node">B</text>
        <text x="365" y="126" class="tree-node">A</text>
        <text x="365" y="156" class="tree-node">B</text>
        <text x="365" y="186" class="tree-node">D</text>
        <text x="365" y="211" class="tree-node">A</text>
        <text x="365" y="261" class="tree-node">D</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>تذكير:</strong> هذا التمرين يستعمل <strong>قانون الاحتمال الكلي</strong>: إذا كانت C1، C2، C3 حوادث متنافية ومجموعها يساوي مجال الإمكانات Ω، فـ P(E)=P(C1)P_C1(E)+P(C2)P_C2(E)+P(C3)P_C3(E).</div>

1) أ) من الصندوق U1 لدينا خمس بطاقات: 1، 1، 2، 3، 3.
إذن:
P(C1)=2/5
P(C2)=1/5
P(C3)=2/5

إذا تحققت C1 نسحب كرية واحدة من U2. في U2 توجد 4 كريات حمراء و2 خضراء من أصل 6:
P_C1(A)=4/6=2/3
P_C1(B)=2/6=1/3

إذا تحققت C2 نسحب كريتين في آن واحد من U2:
عدد السحبات الممكنة هو C(6,2)=15
P_C2(A)=C(4,2)/C(6,2)=6/15=2/5
P_C2(B)=C(2,2)/C(6,2)=1/15
P_C2(D)=1-2/5-1/15=8/15

إذا تحققت C3 نسحب ثلاث كريات في آن واحد من U2:
عدد السحبات الممكنة هو C(6,3)=20
P_C3(A)=C(4,3)/C(6,3)=4/20=1/5
P_C3(B)=0 لأن عدد الكريات الخضراء هو 2 فقط
P_C3(D)=1-1/5=4/5

ب) بهذا تكتمل الشجرة:
• C1 (احتمال 2/5) → A باحتمال 2/3، B باحتمال 1/3.
• C2 (احتمال 1/5) → A باحتمال 2/5، B باحتمال 1/15، D باحتمال 8/15.
• C3 (احتمال 2/5) → A باحتمال 1/5، D باحتمال 4/5.

ج) حساب P(A)، P(B)، P(D) باستعمال قانون الاحتمال الكلي:
P(A)=P(C1)P_C1(A)+P(C2)P_C2(A)+P(C3)P_C3(A)
=2/5×2/3 + 1/5×2/5 + 2/5×1/5
=4/15+2/25+2/25
=20/75+6/75+6/75
=32/75

P(B)=P(C1)P_C1(B)+P(C2)P_C2(B)+P(C3)P_C3(B)
=2/5×1/3 + 1/5×1/15 + 2/5×0
=2/15+1/75
=10/75+1/75
=11/75

P(D)=P(C2)P_C2(D)+P(C3)P_C3(D)
=1/5×8/15 + 2/5×4/5
=8/75+8/25
=8/75+24/75
=32/75

<p class="property-box"><strong>تدقيق:</strong> P(A)+P(B)+P(D)=32/75+11/75+32/75=75/75=1، إذن الحساب متسق.</p>

2) نريد احتمال أن تكون البطاقة تحمل الرقم 3 علمًا أن الكريات المسحوبة حمراء. نستعمل صيغة بيز:\nP_A(C3)=P(C3∩A)/P(A)
P(C3∩A)=P(C3)P_C3(A)=2/5×1/5=2/25
إذن:
P_A(C3)=(2/25)/(32/75)=(2/25)×(75/32)=6/32=3/16

3) X هو عدد الألوان المتحصل عليها.
بما أن الكريات في U2 لها لونان فقط (أحمر وأخضر)، فإن عدد الألوان لا يمكن أن يتجاوز 2. إذن قيم X هي:
• X=1 إذا كانت الكريات كلها من نفس اللون، أي A (كلها حمراء) أو B (كلها خضراء).
• X=2 إذا لم تكن كلها من نفس اللون، أي D.

P(X=1)=P(A)+P(B)=32/75+11/75=43/75
P(X=2)=P(D)=32/75

قانون احتمال X:
P(X=1)=43/75
P(X=2)=32/75

<p class="property-box"><strong>تدقيق:</strong> 43/75+32/75=75/75=1 ✓</p>

E(X)=1×43/75 + 2×32/75 = 43/75+64/75 = 107/75

<p class="property-box"><strong>النتيجة:</strong> E(X)=107/75.</p>

<p class="property-box"><strong>ملاحظة:</strong> بفضل الخطية للأمل الرياضي، E(aX+b)=aE(X)+b. لذلك:</p>
E(75X+1917)=75E(X)+1917
=75×107/75+1917
=107+1917
=2024

<p class="property-box"><strong>النتيجة:</strong> E(75X+1917)=2024.</p>

4) إذا كان عدد الكريات الحمراء في U2 هو n+4، وعدد الكريات الخضراء هو 2، فإن مجموع الكريات هو n+6.
عند تحقق C3 نسحب ثلاث كريات، ونريد:
P_C3(A)=7/15

أي:
C(n+4,3)/C(n+6,3)=7/15

وبالتبسيط:
((n+4)(n+3)(n+2))/((n+6)(n+5)(n+4))=7/15

إذن:
(n+3)(n+2)/((n+6)(n+5))=7/15

15(n+3)(n+2)=7(n+6)(n+5)
15(n^2+5n+6)=7(n^2+11n+30)
15n^2+75n+90=7n^2+77n+210
8n^2-2n-120=0
4n^2-n-60=0

المميز:
Δ=1+960=961=31^2

n=(1+31)/8=4
والحل الآخر سالب مرفوض.

<p class="property-box"><strong>النتيجة:</strong> n=4.</p>`
  },
  {
    id: 8,
    track: "math",
    year: 2024,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق U1 على 7 كريات منها: 3 كريات بيضاء و4 كريات حمراء.
ويحتوي الصندوق U2 على 7 كريات منها: كرتان بيضاوان و5 كريات حمراء.
كل الكريات متماثلة، وجميع السحبات تكون دون إرجاع.

نلقي نردًا متوازنًا أوجهه مرقمة من 1 إلى 6، ونسجل الرقم الظاهر على الوجه العلوي.
إذا ظهر رقم مضاعف للعدد 3، نسحب عشوائيًا من الصندوق U1 كريتين على التوالي دون إرجاع.
في الحالات الأخرى، نسحب عشوائيًا من الصندوق U2 كريتين على التوالي دون إرجاع.

نعتبر الحوادث الآتية:
M: ظهور رقم مضاعف للعدد 3.
A: الحصول على كريتين بيضاوين.
B: الحصول على كريتين حمراوين.
C: الحصول على كريتين من لونين مختلفين.

1) أنقل وأكمل شجرة الاحتمالات المقابلة.
2) نعتبر الحادثتين G: الحصول على كريتين من نفس اللون، وH: الحصول على كرية حمراء في السحب الأول.
بيّن أن P(G)=31/63 ثم احسب P(H).
3) احسب P_G(M) احتمال ظهور رقم مضاعف للعدد 3 علمًا أن الكريتين المسحوبتين من نفس اللون.
4) X المتغير العشوائي الذي يرفق بكل عملية سحب لكريتين عدد الألوان المتحصل عليها.
عين قانون احتمال المتغير العشوائي X، ثم احسب E(63X+1350).`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 520 285" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2024 رياضيات الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2024MathTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="142" x2="170" y2="75" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="35" y1="142" x2="170" y2="210" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="75" x2="350" y2="40" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="75" x2="350" y2="75" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="75" x2="350" y2="110" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="210" x2="350" y2="175" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="210" x2="350" y2="210" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <line x1="195" y1="210" x2="350" y2="245" marker-end="url(#bacTreeArrow2024MathTopic2)"></line>
        <text x="100" y="82" class="tree-prob">P(M)=1/3</text>
        <text x="100" y="212" class="tree-prob">P(M̅)=2/3</text>
        <text x="258" y="44" class="tree-prob">P_M(A)=1/7</text>
        <text x="258" y="80" class="tree-prob">P_M(B)=2/7</text>
        <text x="258" y="116" class="tree-prob">P_M(C)=4/7</text>
        <text x="258" y="179" class="tree-prob">P_M̅(A)=1/21</text>
        <text x="258" y="215" class="tree-prob">P_M̅(B)=10/21</text>
        <text x="258" y="251" class="tree-prob">P_M̅(C)=10/21</text>
        <text x="178" y="82" class="tree-node">M</text>
        <text x="174" y="218" class="tree-node">M̅</text>
        <text x="365" y="46" class="tree-node">A</text>
        <text x="365" y="82" class="tree-node">B</text>
        <text x="365" y="116" class="tree-node">C</text>
        <text x="365" y="181" class="tree-node">A</text>
        <text x="365" y="217" class="tree-node">B</text>
        <text x="365" y="251" class="tree-node">C</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>تذكير:</strong> هذا التمرين يجمع بين <strong>النرد</strong> و<strong>السحب دون إرجاع</strong>. نستعمل قانون الاحتمال الكلي لحساب احتمالات الأحداث النهائية، وصيغة بيز للاحتمالات الشرطية.</div>

1) إكمال الشجرة:
النرد متوازن أوجهه 1،2،3،4،5،6. الأعداد المضاعفة للعدد 3 هي 3 و6، لذلك:
P(M)=2/6=1/3
P(M̅)=1-P(M)=2/3

إذا تحققت M نسحب كريتين من U1، وفيه 3 بيضاء و4 حمراء من أصل 7:
C(7,2)=21
P_M(A)=C(3,2)/C(7,2)=3/21=1/7
P_M(B)=C(4,2)/C(7,2)=6/21=2/7
P_M(C)=1-1/7-2/7=4/7

إذا تحققت M̅ نسحب كريتين من U2، وفيه 2 بيضاء و5 حمراء من أصل 7:
C(7,2)=21
P_M̅(A)=C(2,2)/C(7,2)=1/21
P_M̅(B)=C(5,2)/C(7,2)=10/21
P_M̅(C)=1-1/21-10/21=10/21

<p class="property-box"><strong>ملاحظة:</strong> الحادثة C تعني "كريتان من لونين مختلفين"، وهي المتممة لـ A∪B. لذلك P(C)=1-P(A)-P(B).</p>

2) حساب P(G) ثم P(H):
الحادثة G تعني الحصول على كريتين من نفس اللون، أي A أو B:
P(G)=P(M)[P_M(A)+P_M(B)] + P(M̅)[P_M̅(A)+P_M̅(B)]
=1/3(1/7+2/7)+2/3(1/21+10/21)
=1/3×3/7 + 2/3×11/21
=1/7 + 22/63
=9/63 + 22/63
=31/63

<p class="property-box"><strong>تبيان مطلوب:</strong> P(G)=31/63 ✓</p>

الحادثة H: الحصول على كرية حمراء في السحب الأول.
إذا استعملنا U1 فاحتمال الحمراء أولًا هو 4/7.
إذا استعملنا U2 فاحتمال الحمراء أولًا هو 5/7.
إذن بالاحتمال الكلي:
P(H)=P(M)×4/7 + P(M̅)×5/7
=1/3×4/7 + 2/3×5/7
=4/21+10/21
=14/21
=2/3

3) حساب الاحتمال الشرطي P_G(M):
P_G(M)=P(M∩G)/P(G)
P(M∩G)=P(M)[P_M(A)+P_M(B)]
=1/3×3/7
=1/7
إذن:
P_G(M)=(1/7)/(31/63)=(1/7)×(63/31)=9/31

4) قانون احتمال المتغير العشوائي X وحساب E(63X+1350):
X هو عدد الألوان المتحصل عليها عند سحب كريتين.
• إذا كانتا من نفس اللون فـ X=1.
• إذا كانتا من لونين مختلفين فـ X=2.

P(X=1)=P(G)=31/63
P(X=2)=P(C)=1-P(G)=32/63

قانون احتمال X:
P(X=1)=31/63
P(X=2)=32/63

<p class="property-box"><strong>تدقيق:</strong> 31/63+32/63=63/63=1 ✓</p>

E(X)=1×31/63 + 2×32/63
=31/63+64/63
=95/63

<p class="property-box"><strong>ملاحظة:</strong> بفضل الخطية للأمل الرياضي، E(aX+b)=aE(X)+b. لذلك:</p>
E(63X+1350)=63E(X)+1350
=63×95/63+1350
=95+1350
=1445

<p class="property-box"><strong>النتيجة النهائية:</strong> E(63X+1350)=1445.</p>`
  },
  {
    id: 9,
    track: "math",
    year: 2023,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 10 كرات متماثلة لا نفرق بينها باللمس، منها:
كرتان حمراوان مرقمتان بـ: 2، -3.
وخمس كريات بيضاء مرقمة بـ: 0، 1، 1، 2، -2.
وثلاث كريات خضراء مرقمة بـ: 0، 1، 2.

نسحب عشوائيًا وفي آن واحد ثلاث كريات من الكيس، ونعتبر الحوادث الآتية:
A: الحصول على 3 كريات من نفس اللون.
B: الحصول على الألوان الثلاثة.
C: الحصول على 3 كريات مجموع أرقامها معدوم.

1) أ) احسب P(A) و P(B)، ثم بيّن أن P(C)=3/20.
ب) احسب P(A∩C)، ثم استنتج P_C(A).
2) نعتبر المتغير العشوائي X الذي يرفق بكل سحب لثلاث كريات عدد الألوان المتحصل عليها.
عين قانون الاحتمال للمتغير العشوائي X، ثم احسب أمله الرياضي E(X).
3) نسحب الآن عشوائيًا من الكيس ثلاث كريات على التوالي وبإرجاع.
احسب احتمال الحصول على ثلاث كريات جداء أرقامها معدوم.`,
    solution: `<div class="definition-box"><strong>تذكير:</strong> عدد الحالات الممكنة لسحب 3 كريات من 10 كريات في آن واحد هو C(10,3)=120. نستعمل التوافيق لحساب عدد الحالات الملائمة.</div>

عدد الكريات الكلي هو 10، ونسحب 3 كريات في آن واحد، إذن عدد الحالات الممكنة هو:
C(10,3)=120

1) أ) حساب P(A):
الحادثة A تعني سحب 3 كريات من نفس اللون.
الألوان الموجودة:
• أحمر: 2 كريات
• أبيض: 5 كريات
• أخضر: 3 كريات

لا يمكن سحب 3 حمراء لأن عدد الحمراء 2 فقط.
عدد حالات A هو:
C(5,3)+C(3,3)=10+1=11

إذن:
P(A)=11/120

حساب P(B):
الحادثة B تعني الحصول على الألوان الثلاثة، أي كرة حمراء وواحدة بيضاء وواحدة خضراء.
عدد الحالات الملائمة هو:
2×5×3=30

إذن:
P(B)=30/120=1/4

تبيان P(C):
نرتب الكريات حسب الأرقام:
• -3: كرة واحدة (حمراء)
• -2: كرة واحدة (بيضاء)
• 0: كرتان (بيضاء وخضراء)
• 1: ثلاث كريات (بيضاء اثنتان وخضراء واحدة)
• 2: ثلاث كريات (حمراء واحدة وبيضاء واحدة وخضراء واحدة)

نبحث عن ثلاث كريات مجموع أرقامها 0.
الحالات الممكنة هي:
• (-3,1,2): عددها 1×3×3=9
• (-2,0,2): عددها 1×2×3=6
• (-2,1,1): عددها 1×C(3,2)=3

إذن عدد الحالات الملائمة هو:
9+6+3=18

ومنه:
P(C)=18/120=3/20

<p class="property-box"><strong>تدقيق:</strong> P(C)=18/120=3/20 ✓</p>

1) ب) حساب P(A∩C):
نريد ثلاث كريات من نفس اللون ومجموع أرقامها 0.
• لا يمكن ذلك في اللون الأحمر لأن عدد الكريات الحمراء 2 فقط.
• في اللون الأخضر الأرقام هي 0، 1، 2، ومجموعها 3 ≠ 0.
• في اللون الأبيض الأرقام هي: 0، 1، 1، 2، -2.
  المجموع يساوي 0 في حالتين:
  (-2,0,2) و (-2,1,1)

إذن عدد حالات A∩C هو 2.
ومنه:
P(A∩C)=2/120=1/60

الاحتمال الشرطي:
P_C(A)=P(A∩C)/P(C)
=(1/60)/(3/20)
=(1/60)×(20/3)
=1/9

2) قانون احتمال X:
X هو عدد الألوان المتحصل عليها عند سحب 3 كريات.
إذن قيم X هي: 1، 2، 3.

• X=1 يعني كل الكريات من نفس اللون، وهذا هو الحدث A:
  P(X=1)=11/120

• X=3 يعني الحصول على الألوان الثلاثة، وهذا هو الحدث B:
  P(X=3)=30/120=1/4

• X=2 يعني الحصول على لونين فقط:
  P(X=2)=1-P(X=1)-P(X=3)
  =1-11/120-30/120
  =79/120

قانون الاحتمال:
P(X=1)=11/120
P(X=2)=79/120
P(X=3)=30/120

<p class="property-box"><strong>تدقيق:</strong> 11/120+79/120+30/120=120/120=1 ✓</p>

الأمل الرياضي:
E(X)=1×11/120+2×79/120+3×30/120
=(11+158+90)/120
=259/120

3) السحب على التوالي وبإرجاع:
جداء الأرقام يكون معدومًا إذا وفقط إذا ظهرت على الأقل كرة تحمل الرقم 0.
عدد الكريات التي تحمل الرقم 0 هو 2 من أصل 10.

احتمال عدم سحب كرة تحمل الرقم 0 في سحبة واحدة هو:
8/10=4/5

ومع الإرجاع تكون السحبات مستقلة، إذن احتمال عدم ظهور 0 في السحبات الثلاث هو:
(4/5)^3=64/125

إذن احتمال ظهور 0 مرة على الأقل، أي أن يكون الجداء معدومًا، هو:
1-64/125=61/125

<p class="property-box"><strong>النتيجة:</strong> احتمال أن يكون جداء الأرقام معدومًا هو 61/125.</p>`
  },
  {
    id: 10,
    track: "math",
    year: 2023,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق U على كرتين حمراوين وكرتين خضراوين.
ويحتوي الصندوق V على كرتين حمراوين وثلاث كرات خضراء.
كل الكرات متماثلة لا نفرق بينها عند اللمس.

نسحب عشوائيًا كرتين في آن واحد من أحد الصندوقين بالكيفية الآتية:
نسحب بطاقة واحدة عشوائيًا من كيس به 10 بطاقات متماثلة ومرقمة من 1 إلى 10.
إذا تحصلنا على عدد أولي نسحب الكرتين من الصندوق U، وفي باقي الحالات نسحب الكرتين من الصندوق V.

نعتبر الحوادث الآتية:
A: سحب كرتين حمراوين.
B: سحب كرتين خضراوين.
C: سحب كرتين من لونين مختلفين.

1) أ) أنجز شجرة الاحتمالات التي نمذج هذه التجربة.
ب) بيّن أن P(A)=19/150 و P(B)=37/150 ثم استنتج P(C).
2) المتغير العشوائي X الذي يرفق بكل عملية سحب لكرتين عدد الكريات الحمراء المتحصل عليها.
أ) عين قانون الاحتمال للمتغير العشوائي X، ثم احسب أمله الرياضي E(X).
ب) احسب احتمال الحدث: ln X <= 1.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 540 285" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2023 رياضيات الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2023MathTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="142" x2="180" y2="75" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="35" y1="142" x2="180" y2="210" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="40" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="75" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="110" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="175" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="210" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="245" marker-end="url(#bacTreeArrow2023MathTopic2)"></line>
        <text x="100" y="82" class="tree-prob">P(U)=2/5</text>
        <text x="100" y="212" class="tree-prob">P(V)=3/5</text>
        <text x="268" y="44" class="tree-prob">P_U(A)=1/6</text>
        <text x="268" y="80" class="tree-prob">P_U(B)=1/6</text>
        <text x="268" y="116" class="tree-prob">P_U(C)=2/3</text>
        <text x="268" y="179" class="tree-prob">P_V(A)=1/10</text>
        <text x="268" y="215" class="tree-prob">P_V(B)=3/10</text>
        <text x="268" y="251" class="tree-prob">P_V(C)=3/5</text>
        <text x="186" y="82" class="tree-node">U</text>
        <text x="186" y="218" class="tree-node">V</text>
        <text x="380" y="46" class="tree-node">A</text>
        <text x="380" y="82" class="tree-node">B</text>
        <text x="380" y="116" class="tree-node">C</text>
        <text x="380" y="181" class="tree-node">A</text>
        <text x="380" y="217" class="tree-node">B</text>
        <text x="380" y="251" class="tree-node">C</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>تذكير:</strong> هذا التمرين يستعمل <strong>قانون الاحتمال الكلي</strong>. اختيار الصندوق U أو V يعتمد على سحب بطاقة من 1 إلى 10.</div>

أولًا نحدد احتمال اختيار الصندوق:
الأعداد الأولية من 1 إلى 10 هي: 2، 3، 5، 7.
إذن عددها 4 من أصل 10.

P(U)=4/10=2/5
P(V)=6/10=3/5

1) أ) إكمال الشجرة:

في الصندوق U توجد كرتان حمراوان وكرتان خضراوان، والمجموع 4.
نسحب كرتين في آن واحد، عدد الحالات C(4,2)=6:
P_U(A)=C(2,2)/C(4,2)=1/6
P_U(B)=C(2,2)/C(4,2)=1/6
P_U(C)=1-1/6-1/6=4/6=2/3

في الصندوق V توجد كرتان حمراوان وثلاث كرات خضراء، والمجموع 5.
نسحب كرتين في آن واحد، عدد الحالات C(5,2)=10:
P_V(A)=C(2,2)/C(5,2)=1/10
P_V(B)=C(3,2)/C(5,2)=3/10
P_V(C)=1-1/10-3/10=6/10=3/5

1) ب) حساب P(A)، P(B)، ثم P(C):

P(A)=P(U)P_U(A)+P(V)P_V(A)
=2/5×1/6 + 3/5×1/10
=2/30 + 3/50
=10/150 + 9/150
=19/150

<p class="property-box"><strong>تبيان:</strong> P(A)=19/150 ✓</p>

P(B)=P(U)P_U(B)+P(V)P_V(B)
=2/5×1/6 + 3/5×3/10
=2/30 + 9/50
=10/150 + 27/150
=37/150

<p class="property-box"><strong>تبيان:</strong> P(B)=37/150 ✓</p>

بما أن A وB وC تشكل تجزئة للنتائج الممكنة حسب ألوان الكرتين:
P(C)=1-P(A)-P(B)
=1-19/150-37/150
=94/150
=47/75

2) قانون احتمال X:
X هو عدد الكريات الحمراء المتحصل عليها عند سحب كرتين.
قيم X هي: 0، 1، 2.

• X=2 يعني سحب كرتين حمراوين، أي الحادثة A:
  P(X=2)=P(A)=19/150

• X=0 يعني سحب كرتين خضراوين، أي الحادثة B:
  P(X=0)=P(B)=37/150

• X=1 يعني سحب كرتين من لونين مختلفين، أي الحادثة C:
  P(X=1)=P(C)=94/150=47/75

قانون X:
P(X=0)=37/150
P(X=1)=94/150
P(X=2)=19/150

<p class="property-box"><strong>تدقيق:</strong> 37/150+94/150+19/150=150/150=1 ✓</p>

الأمل الرياضي:
E(X)=0×37/150 + 1×94/150 + 2×19/150
=(94+38)/150
=132/150
=22/25

2) ب) حساب P(ln X <= 1):
بما أن X يأخذ القيم 0، 1، 2.
• القيمة ln(0) غير معرفة، لذلك لا تدخل الحالة X=0 في الحدث.
• ln(1)=0 <= 1 ✓
• ln(2) <= 1 لأن 2 <= e ✓

<p class="property-box"><strong>ملاحظة:</strong> ln(0) غير معرّف، لذلك لا تدخل الحالة X=0 في الحدث. إذن الحدث ln X ≤ 1 يتحقق فقط عند X=1 أو X=2.</p>

P(ln X <= 1)=P(X=1)+P(X=2)
=94/150+19/150
=113/150

<p class="property-box"><strong>النتيجة:</strong> P(ln X <= 1)=113/150.</p>`
  },
  {
    id: 11,
    track: "math",
    year: 2021,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

كيس به 12 كرية متماثلة لا نفرق بينها باللمس.
كل من الكريات الاثنتي عشرة تحمل رقمًا من بين الأعداد التالية: 1، 2، 3، 4.
نسحب عشوائيًا كرية واحدة من الكيس.

نرمز بـ p_i إلى احتمال سحب كرية رقمها i، حيث:
p_1=1/3 ، p_2=1/6 ، p_3=1/4 ، p_4=1/4.

1) أذكر أعداد الكريات الاثنتي عشرة من الأرقام 1، 2، 3، 4.
2) احسب احتمال كل من الحوادث A وB وC الآتية:
A: سحب كرية تحمل رقمًا فرديًا.
B: سحب كرية تحمل رقمًا من نظام التعداد ذي الأساس 4.
C: سحب كرية رقمها حل المعادلة x^2=2^x.
3) المتغير العشوائي X يرفق بكل سحب للكرية الرقم الذي تحمله.
عين مجموعة قيم المتغير العشوائي X، ثم احسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>تذكير:</strong> عندما تكون الكريات متماثلة، فإن احتمال سحب كرية تحمل رقمًا i يساوي نسبة عدد الكريات التي تحمل i إلى العدد الكلي للكريات.</div>

1) تحديد عدد الكريات التي تحمل كل رقم:
لدينا 12 كرية.
وبما أن p_i هو احتمال سحب كرية رقمها i، فإن:
عدد الكريات التي تحمل الرقم i = 12 × p_i

• للرقم 1: 12 × 1/3 = 4
• للرقم 2: 12 × 1/6 = 2
• للرقم 3: 12 × 1/4 = 3
• للرقم 4: 12 × 1/4 = 3

إذن أعداد الكريات هي:
4 كريات تحمل الرقم 1، 2 كريتان تحملان الرقم 2، 3 كريات تحمل الرقم 3، و 3 كريات تحمل الرقم 4.

<p class="property-box"><strong>تدقيق:</strong> 4+2+3+3=12 ✓</p>

2) حساب الاحتمالات:

الحادثة A: سحب كرية تحمل رقمًا فرديًا.
الأرقام الفردية هي 1 و3.
P(A)=p_1+p_3
=1/3+1/4
=4/12+3/12
=7/12

الحادثة B: سحب كرية تحمل رقمًا من نظام التعداد ذي الأساس 4.
في نظام التعداد ذي الأساس 4، الأرقام المستعملة هي: 0، 1، 2، 3.
ومن بين الأرقام الموجودة في الكيس 1، 2، 3، 4، فإن الأرقام المقبولة هي 1، 2، 3.
إذن:
P(B)=p_1+p_2+p_3
=1/3+1/6+1/4
=4/12+2/12+3/12
=9/12
=3/4

الحادثة C: سحب كرية رقمها حل المعادلة x^2=2^x.
نختبر القيم الممكنة 1، 2، 3، 4:
• 1^2=1 و 2^1=2، إذن 1 ليس حلًا.
• 2^2=4 و 2^2=4، إذن 2 حل.
• 3^2=9 و 2^3=8، إذن 3 ليس حلًا.
• 4^2=16 و 2^4=16، إذن 4 حل.

إذن C يعني سحب رقم 2 أو رقم 4.
P(C)=p_2+p_4
=1/6+1/4
=2/12+3/12
=5/12

<p class="property-box"><strong>تدقيق:</strong> P(A)+P(B') حيث B' هي الأرقام غير المقبولة في الأساس 4 (هنا الرقم 4)، ولاحظ أن P(A)+P(C)=7/12+5/12=1 لأن الأرقام الفردية {1,3} والحلول {2,4} يشكلان تجزئة للمجموعة {1,2,3,4}.</p>

3) المتغير العشوائي X:
X هو الرقم المكتوب على الكرية المسحوبة.
إذن مجموعة قيمه هو:
X(Ω)={1,2,3,4}

قانون احتمال X:
P(X=1)=1/3
P(X=2)=1/6
P(X=3)=1/4
P(X=4)=1/4

<p class="property-box"><strong>تدقيق:</strong> 1/3+1/6+1/4+1/4=4/12+2/12+3/12+3/12=12/12=1 ✓</p>

الأمل الرياضي:
E(X)=1×1/3 + 2×1/6 + 3×1/4 + 4×1/4
=1/3+1/3+3/4+1
=2/3+7/4
=8/12+21/12
=29/12

<p class="property-box"><strong>النتيجة:</strong> E(X)=29/12 ≈ 2.42.</p>\n\n<p class="definition-box"><strong>تحقق:</strong> بما أن قيم X هي 1، 2، 3، 4، فإن E(X) يجب أن يكون بين 1 و4. وبالفعل 1 < 29/12 ≈ 2.42 < 4 ✓</p>`
  },
  {
    id: 12,
    track: "math",
    year: 2021,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يراد عشوائيًا تشكيل لجنة تضم رئيسًا ونائبًا له من بين ثلاثة رجال H1 ، H2 ، H3 وأربع نساء F1 ، F2 ، F3 ، F4.

1) بيّن أن عدد اللجان التي يمكن تشكيلها هو 42.
2) نعتبر الحوادث الآتية:
A: اللجنة من نفس الجنس.
B: اللجنة من جنسين مختلفين.
C: H1 هو الرئيس.
E: اللجنة لا تضم كلا من H1 و F1.

أ) احسب احتمال الحادث A ثم استنتج P(B).
ب) احسب P(C) و P(E).

3) المتغير العشوائي X يرفق بكل لجنة عدد الرجال فيها.
عين قانون احتمال X، ثم احسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>تذكير:</strong> عند اختيار رئيس ونائب من بين n شخص، يكون عدد الاختيارات الممكنة n×(n-1) لأن الترتيب مهم.</div>

1) حساب عدد اللجان:
لدينا 7 أشخاص: 3 رجال و4 نساء.
نختار رئيسًا ثم نائبًا له.
• اختيار الرئيس: 7 إمكانيات.
• اختيار النائب بعد الرئيس: 6 إمكانيات.

إذن عدد اللجان هو:
7 × 6 = 42

<p class="property-box"><strong>تبيان:</strong> عدد اللجان الممكنة هو 42 ✓</p>

2) أ) حساب P(A) ثم P(B):
الحادثة A: اللجنة من نفس الجنس.

• لجنة من رجلين:
  نختار الرئيس من 3 رجال، ثم النائب من الرجلين الباقيين:
  3 × 2 = 6

• لجنة من امرأتين:
  نختار الرئيس من 4 نساء، ثم النائب من 3 نساء باقيات:
  4 × 3 = 12

إذن عدد حالات A هو:
6 + 12 = 18

P(A)=18/42=3/7

الحادثة B: اللجنة من جنسين مختلفين.
وهي متممة للحادثة A، لذلك:
P(B)=1-P(A)=1-3/7=4/7

2) ب) حساب P(C):
الحادثة C: H1 هو الرئيس.
إذا ثبتنا H1 رئيسًا، نختار النائب من بين 6 أشخاص.
إذن عدد الحالات الملائمة هو 6.

P(C)=6/42=1/7

حساب P(E):
الحادثة E: اللجنة لا تضم كلا من H1 و F1.
أي لا يكون الشخصان H1 وF1 معًا في نفس اللجنة.

نحسب المتممة E̅: اللجنة تضم H1 وF1 معًا.
إذا كانت اللجنة تضم H1 وF1، فهناك ترتيبان فقط:
• H1 رئيس وF1 نائب.
• F1 رئيس وH1 نائب.

إذن عدد حالات E̅ هو 2.
P(E̅)=2/42=1/21

ومنه:
P(E)=1-P(E̅)=1-1/21=20/21

3) قانون احتمال X:
X هو عدد الرجال في اللجنة.
القيم الممكنة هي:
• X=0: امرأتان.
• X=1: رجل وامرأة.
• X=2: رجلان.

عدد حالات X=0:
اختيار رئيسة ونائبة من بين 4 نساء:
4 × 3 = 12
P(X=0)=12/42=2/7

عدد حالات X=2:
اختيار رئيس ونائب من بين 3 رجال:
3 × 2 = 6
P(X=2)=6/42=1/7

عدد حالات X=1:
رجل وامرأة مع ترتيب المنصبين:
3 × 4 × 2 = 24
P(X=1)=24/42=4/7

<p class="property-box"><strong>تدقيق:</strong> 2/7+4/7+1/7=1 ✓</p>

قانون X:
P(X=0)=2/7
P(X=1)=4/7
P(X=2)=1/7

الأمل الرياضي:
E(X)=0×2/7 + 1×4/7 + 2×1/7
=(0+4+2)/7
=6/7

<p class="property-box"><strong>النتيجة:</strong> E(X)=6/7.</p>`
  },
  {
    id: 13,
    track: "math",
    year: 2020,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

صندوق به 5 كريات بيضاء و3 كريات حمراء، كل الكريات متماثلة لا نفرق بينها باللمس.
نسحب من الصندوق كرية واحدة:
إذا ظهرت كرية حمراء نعيدها إلى الصندوق ونضيف له كرية بيضاء.
وإذا ظهرت كرية بيضاء نعيدها إلى الصندوق ونضيف له كرية حمراء.
ثم نكرر العملية مرة ثانية.

1) انقل شجرة الاحتمالات المقابلة التي نمذج هذه التجربة ثم أكملها.
2) بيّن أن احتمال أن يوجد في الصندوق 7 كريات بيضاء هو 1/8.
3) احسب احتمال أن يوجد في الصندوق 4 كريات حمراء على الأقل.
4) ليكن X المتغير العشوائي الذي يأخذ كقيمة عدد الكريات البيضاء الموجودة في الصندوق بعد العملية الثانية.
أ) برّر أن قيم المتغير العشوائي X هي: 5، 6، 7.
ب) عرّف قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي E(X).`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 520 260" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2020 رياضيات">
        <defs>
          <marker id="bacTreeArrow2020MathTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="130" x2="185" y2="70" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <line x1="35" y1="130" x2="185" y2="190" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <line x1="205" y1="70" x2="380" y2="35" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <line x1="205" y1="70" x2="380" y2="105" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <line x1="205" y1="190" x2="380" y2="155" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <line x1="205" y1="190" x2="380" y2="225" marker-end="url(#bacTreeArrow2020MathTopic1)"></line>
        <text x="100" y="82" class="tree-prob">P(R)=3/8</text>
        <text x="100" y="198" class="tree-prob">P(B)=5/8</text>
        <text x="268" y="38" class="tree-prob">P_R(R)=1/3</text>
        <text x="268" y="108" class="tree-prob">P_R(B)=2/3</text>
        <text x="268" y="158" class="tree-prob">P_B(R)=4/9</text>
        <text x="268" y="228" class="tree-prob">P_B(B)=5/9</text>
        <text x="190" y="74" class="tree-node">R</text>
        <text x="190" y="198" class="tree-node">B</text>
        <text x="395" y="39" class="tree-node">R</text>
        <text x="395" y="109" class="tree-node">B</text>
        <text x="395" y="159" class="tree-node">R</text>
        <text x="395" y="229" class="tree-node">B</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>تذكير:</strong> في هذه التجربة، بعد كل سحب نعيد الكرية ونضيف كرية بلون معاكس. لذلك تتغير تكوينة الصندوق قبل السحبة الثانية.</div>

نرمز بـ B إلى سحب كرية بيضاء، وبـ R إلى سحب كرية حمراء.
في البداية يوجد 5 بيضاء و3 حمراء، أي 8 كريات.

1) إكمال شجرة الاحتمالات:

السحب الأول:
P(B)=5/8
P(R)=3/8

إذا ظهرت R أولًا، نعيدها ونضيف بيضاء.
يصبح الصندوق: 6 بيضاء و3 حمراء، أي 9 كريات.
إذن:
P_R(B)=6/9=2/3
P_R(R)=3/9=1/3

إذا ظهرت B أولًا، نعيدها ونضيف حمراء.
يصبح الصندوق: 5 بيضاء و4 حمراء، أي 9 كريات.
إذن:
P_B(B)=5/9
P_B(R)=4/9

2) احتمال أن يوجد في الصندوق 7 كريات بيضاء:
نحصل على 7 كريات بيضاء إذا أضفنا كريتين بيضاوين.
وهذا يحدث عند سحب R ثم R.

P(R∩R)=P(R)×P_R(R)
=3/8×1/3
=1/8

<p class="property-box"><strong>تبيان:</strong> P(X=7)=P(RR)=1/8 ✓</p>

3) احتمال أن يوجد في الصندوق 4 كريات حمراء على الأقل:
عدد الكريات الحمراء في البداية هو 3.
بعد عمليتين، يكون عدد الحمراء على الأقل 4 إذا أضفنا حمراء مرة واحدة على الأقل.
إضافة حمراء تحدث عند سحب كرية بيضاء.
إذن نأخذ متممة: لا نضيف أي حمراء، أي نسحب R ثم R.

P(عدد الحمراء ≥ 4)=1-P(R∩R)
=1-1/8
=7/8

4) قيم X وحساب E(X):
X هو عدد الكريات البيضاء بعد العملية الثانية.
في البداية عدد البيضاء هو 5.
• كل مرة نسحب فيها R نضيف بيضاء.
• كل مرة نسحب فيها B لا نضيف بيضاء.

خلال عمليتين يمكن إضافة 0 أو 1 أو 2 كريات بيضاء، إذن:
X∈{5,6,7}

قانون احتمال X:
• X=7 يحدث عند RR:
  P(X=7)=P(R)×P_R(R)=3/8×1/3=1/8

• X=5 يحدث عند BB:
  P(X=5)=P(B)×P_B(B)=5/8×5/9=25/72

• X=6 يحدث عند RB أو BR:
  P(X=6)=P(R)P_R(B)+P(B)P_B(R)
  =3/8×2/3 + 5/8×4/9
  =1/4 + 20/72
  =18/72+20/72
  =38/72=19/36

<p class="property-box"><strong>تدقيق:</strong> 25/72+38/72+9/72=72/72=1 ✓</p>

قانون X:
P(X=5)=25/72
P(X=6)=19/36
P(X=7)=1/8

الأمل الرياضي:
E(X)=5×25/72 + 6×19/36 + 7×1/8
=125/72 + 228/72 + 63/72
=416/72
=52/9

<p class="property-box"><strong>النتيجة:</strong> E(X)=52/9.</p>`
  },
  {
    id: 14,
    track: "math",
    year: 2020,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق على كريات متماثلة منها:
n كرية بيضاء تحمل العدد π، حيث n عدد طبيعي و n>=2.
و4 كريات حمراء تحمل الأعداد: π/2 ، π/2 ، π/3 ، π.
وكرتان خضراوان تحملان العددين: π/2 ، π/3.

نسحب عشوائيًا كرتين في آن واحد من هذا الصندوق.

1) أ) احسب احتمال كل من A وB حيث:
A: سحب كريتين من نفس اللون.
B: سحب كريتين تحملان نفس العدد علمًا أنهما من نفس اللون.
ب) عين العدد الطبيعي n حتى يكون P(A)=17/55.

2) نفرض فيما يلي أن n=5، ونسمي α وβ العددين الظاهرين على الكريتين المسحوبتين.
نعتبر المتغير العشوائي X الذي يرفق بكل نتيجة سحب العدد: cos(α)cos(β).
أ) برّر أن قيم المتغير العشوائي X هي: -1/2 ، 0 ، 1/4 ، 1.
ب) بيّن أن P(X=0)=27/55.
ج) عين قانون احتمال المتغير العشوائي X، واحسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>تذكير:</strong> عدد طرق اختيار كرتين من n+6 كرة هو C(n+6,2). الاحتمال الشرطي P_A(B) يعني احتمال B بفرض تحقق A.</div>

1) أ) حساب P(A):
عدد الكريات الكلي هو n+6.
نسحب كريتين في آن واحد، إذن عدد الحالات الممكنة:
C(n+6,2)=(n+6)(n+5)/2

ألوان الكريات:
• بيضاء: n كريات
• حمراء: 4 كريات
• خضراء: 2 كريات

A: سحب كريتين من نفس اللون.
عدد الحالات الملائمة:
C(n,2)+C(4,2)+C(2,2)
=n(n-1)/2+6+1
=n(n-1)/2+7

إذن:
P(A)=[C(n,2)+C(4,2)+C(2,2)]/C(n+6,2)
=[n(n-1)/2+7]/[(n+6)(n+5)/2]
=[n(n-1)+14]/[(n+6)(n+5)]

حساب P_A(B):
B: سحب كريتين تحملان نفس العدد علمًا أنهما من نفس اللون.
نحسب داخل حالات A فقط.

• داخل اللون الأبيض: كل الكريات البيضاء تحمل π، إذن كل اختيار كريتين بيضاوين يحقق B:
  C(n,2) حالة.

• داخل اللون الأحمر: الأعداد هي π/2 ، π/2 ، π/3 ، π.
  نفس العدد يحدث فقط عند اختيار الكريتين الحاملتين لـ π/2:
  1 حالة.

• داخل اللون الأخضر: العددان π/2 وπ/3 مختلفان، فلا توجد حالة.

إذن:
P_A(B)=[C(n,2)+1]/[C(n,2)+C(4,2)+C(2,2)]
=[n(n-1)/2+1]/[n(n-1)/2+7]
=[n(n-1)+2]/[n(n-1)+14]

1) ب) تعيين n بحيث P(A)=17/55:
[n(n-1)+14]/[(n+6)(n+5)] = 17/55

55[n(n-1)+14]=17(n+6)(n+5)
55(n^2-n+14)=17(n^2+11n+30)
55n^2-55n+770=17n^2+187n+510
38n^2-242n+260=0
19n^2-121n+130=0

نحل:
Δ=121^2-4×19×130=14641-9880=4761=69^2

n=(121±69)/(38)
n=5 أو n=50/38=25/19 غير طبيعي.

<p class="property-box"><strong>النتيجة:</strong> n=5.</p>

2) نأخذ n=5.
عدد الكريات الكلي هو 11، وعدد السحبات الممكنة:
C(11,2)=55

نستعمل القيم:
cos(π)=-1
cos(π/2)=0
cos(π/3)=1/2

أ) قيم X=cos(α)cos(β):
• إذا كان العددان π وπ فالقيمة (-1)×(-1)=1.
• إذا ظهر π/2 في إحدى الكريتين فالقيمة 0.
• إذا كان العددان π/3 وπ/3 فالقيمة (1/2)×(1/2)=1/4.
• إذا كان العددان π وπ/3 فالقيمة (-1)×(1/2)=-1/2.

إذن قيم X هي:
{-1/2, 0, 1/4, 1}

ب) تبيان P(X=0):
X=0 عندما تظهر على الأقل كرية تحمل العدد π/2.
عدد الكريات التي تحمل π/2 هو 3 (كريتان حمراوان وكرية خضراء).
عدد الكريات التي لا تحمل π/2 هو 8.

P(X=0)=1-C(8,2)/C(11,2)
=1-28/55
=27/55

<p class="property-box"><strong>تبيان:</strong> P(X=0)=27/55 ✓</p>

ج) قانون احتمال X:
نعد الكريات حسب العدد المكتوب عليها:
• π: 6 كريات (5 بيضاء + 1 حمراء).
• π/2: 3 كريات (2 حمراء + 1 خضراء).
• π/3: 2 كريات (1 حمراء + 1 خضراء).

• X=1 عند اختيار كريتين تحملان π:
  P(X=1)=C(6,2)/55=15/55=3/11

• X=1/4 عند اختيار كريتين تحملان π/3:
  P(X=1/4)=C(2,2)/55=1/55

• X=-1/2 عند اختيار كرية تحمل π وكرية تحمل π/3:
  P(X=-1/2)=6×2/55=12/55

• X=0:
  P(X=0)=27/55

<p class="property-box"><strong>تدقيق:</strong> 12/55+27/55+1/55+15/55=55/55=1 ✓</p>

قانون X:
P(X=-1/2)=12/55
P(X=0)=27/55
P(X=1/4)=1/55
P(X=1)=15/55

الأمل الرياضي:
E(X)=(-1/2)×12/55 + 0×27/55 + (1/4)×1/55 + 1×15/55
=-6/55 + 1/220 + 15/55
=9/55 + 1/220
=36/220+1/220
=37/220

<p class="property-box"><strong>النتيجة:</strong> E(X)=37/220.</p>`
  },
  {
    id: 15,
    track: "math",
    year: 2019,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

صندوقان غير شفافين U1 و U2.
يحتوي الصندوق U1 على 4 كرات حمراء و3 كرات سوداء.
ويحتوي الصندوق U2 على 3 كرات حمراء وكرتين سوداويين.
كل الكرات متشابهة لا نفرق بينها عند اللمس.

نرمي نردًا غير مزور ذا ستة أوجه مرقمة من 1 إلى 6.
إذا ظهر الرقمان 2 أو 4 نسحب عشوائيًا كرتين في آن واحد من الصندوق U1.
وفي باقي الحالات نسحب عشوائيًا كرتين في آن واحد من الصندوق U2.

نعتبر الأحداث A وB وC المعرفة بـ:
A: سحب كرتين حمراوين.
B: سحب كرتين سوداويتين.
C: سحب كرتين من لونين مختلفين.

1) أنقل وأكمل شجرة الاحتمالات.
2) احسب احتمالات الأحداث A وB وC.
3) نعتبر المتغير العشوائي X الذي يرفق بكل سحب عدد الكريات الحمراء المسحوبة.
أ) عين قيم المتغير العشوائي X.
ب) عين قانون الاحتمال للمتغير العشوائي X.
4) احسب الأمل الرياضي E(X).`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 540 285" role="img" aria-label="شجرة احتمالات موضوع بكالوريا 2019 رياضيات الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2019MathTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="142" x2="180" y2="75" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="35" y1="142" x2="180" y2="210" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="40" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="75" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="75" x2="365" y2="110" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="175" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="210" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <line x1="205" y1="210" x2="365" y2="245" marker-end="url(#bacTreeArrow2019MathTopic2)"></line>
        <text x="186" y="82" class="tree-node">U₁</text>
        <text x="186" y="218" class="tree-node">U₂</text>
        <text x="380" y="46" class="tree-node">A</text>
        <text x="380" y="82" class="tree-node">B</text>
        <text x="380" y="116" class="tree-node">C</text>
        <text x="380" y="181" class="tree-node">A</text>
        <text x="380" y="217" class="tree-node">B</text>
        <text x="380" y="251" class="tree-node">C</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>التجربة:</strong> نبدأ برمي نرد متوازن؛ إذا ظهر 2 أو 4 نسحب من U1، وإلا من U2.</div>

1) إكمال الشجرة:
• إذا ظهر 2 أو 4 (حالتان من 6) نختار الصندوق U1:
  P(U1)=2/6=1/3
• في باقي الحالات (4 حالات) نختار U2:
  P(U2)=4/6=2/3

في U1: 4 حمراء و3 سوداء، المجموع 7.
نسحب كرتين في آن واحد، عدد الحالات C(7,2)=21:
• P_U1(A)=C(4,2)/C(7,2)=6/21=2/7
• P_U1(B)=C(3,2)/C(7,2)=3/21=1/7
• P_U1(C)=1-2/7-1/7=4/7

في U2: 3 حمراء و2 سوداء، المجموع 5.
نسحب كرتين في آن واحد، عدد الحالات C(5,2)=10:
• P_U2(A)=C(3,2)/C(5,2)=3/10
• P_U2(B)=C(2,2)/C(5,2)=1/10
• P_U2(C)=1-3/10-1/10=6/10=3/5

<p class="property-box"><strong>شجرة الاحتمالات:</strong> U1(1/3) فرعها A(2/7)، B(1/7)، C(4/7)؛ U2(2/3) فرعها A(3/10)، B(1/10)، C(3/5).</p>

2) حساب P(A)، P(B)، P(C) (قاعدة الاحتمال الكلي):

P(A)=P(U1)P_U1(A)+P(U2)P_U2(A)
=1/3×2/7 + 2/3×3/10
=2/21+1/5
=10/105+21/105
=31/105

P(B)=P(U1)P_U1(B)+P(U2)P_U2(B)
=1/3×1/7 + 2/3×1/10
=1/21+1/15
=5/105+7/105
=12/105=4/35

P(C)=P(U1)P_U1(C)+P(U2)P_U2(C)
=1/3×4/7 + 2/3×3/5
=4/21+2/5
=20/105+42/105
=62/105

<p class="property-box"><strong>تدقيق:</strong> 31/105+12/105+62/105=105/105=1 ✓</p>

3) المتغير العشوائي X:
X هو عدد الكريات الحمراء المسحوبة.
قيم X هي:
• X=0 عند سحب كرتين سوداويتين، أي B.
• X=1 عند سحب كرتين من لونين مختلفين، أي C.
• X=2 عند سحب كرتين حمراوين، أي A.

إذن قانون احتمال X:
P(X=0)=P(B)=4/35
P(X=1)=P(C)=62/105
P(X=2)=P(A)=31/105

<p class="property-box"><strong>تدقيق:</strong> 4/35=12/105، إذن 12/105+62/105+31/105=1 ✓</p>

4) الأمل الرياضي:
E(X)=0×P(X=0) + 1×P(X=1) + 2×P(X=2)
=0×4/35 + 1×62/105 + 2×31/105
=62/105+62/105
=124/105

<p class="property-box"><strong>النتيجة:</strong> E(X)=124/105.</p>`
  },
  {
    id: 16,
    track: "math",
    year: 2018,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

كيس يحتوي 9 كريات لا نفرق بينها باللمس موزعة كما يلي:
خمس كريات حمراء مرقمة بـ: 1، 1، 2، 2، 2.
وثلاث كريات خضراء مرقمة بـ: -3، 2، 3.
وكرية بيضاء مرقمة بـ: -1.

نسحب عشوائيًا 4 كريات في آن واحد.

1) احسب احتمال الحوادث التالية:
A: الحصول على أربع كريات من نفس اللون.
B: الحصول على كرية بيضاء على الأكثر.
C: الحصول على أربع كريات مجموع أرقامها معدوم.

2) ليكن X المتغير العشوائي الذي يرفق بكل نتيجة سحب عدد الكريات الخضراء المتبقية في الكيس.
أ) عين قيم المتغير العشوائي X، ثم عرّف قانون احتماله.
ب) احسب الأمل الرياضي E(X) للمتغير العشوائي X.
ج) احسب احتمال الحادثة: X^2-X>0.`,
    solution: `<div class="definition-box"><strong>التجربة:</strong> كيس يحتوي 9 كريات؛ نسحب 4 كريات في آن واحد. عدد الحالات الممكنة C(9,4)=126.</div>

1) حساب P(A):
A: الحصول على أربع كريات من نفس اللون.
الألوان:
• حمراء: 5 كريات
• خضراء: 3 كريات
• بيضاء: 1 كرية

لا يمكن سحب 4 خضراء (لأنها 3 فقط) ولا 4 بيضاء (لأنها 1 فقط).
إذن الحالة الوحيدة هي سحب 4 حمراء من 5.

عدد الحالات الملائمة:
C(5,4)=5

P(A)=5/126

حساب P(B):
B: الحصول على كرية بيضاء على الأكثر.
في الكيس توجد كرية بيضاء واحدة فقط، لذلك في أي سحب لأربع كريات لا يمكن الحصول على أكثر من كرية بيضاء.
إذن الحادثة B أكيدة.

P(B)=1

حساب P(C):
C: الحصول على أربع كريات مجموع أرقامها معدوم.

الأرقام الموجودة هي:
• الحمراء: 1، 1، 2، 2، 2
• الخضراء: -3، 2، 3
• البيضاء: -1

نبحث عن أربع كريات مجموع أرقامها 0.
الحالات الممكنة:
• (-3, -1, 2, 2): نختار -3 مرة واحدة، -1 مرة واحدة، واثنتين من الكريات التي تحمل الرقم 2.
  عدد الكريات التي تحمل الرقم 2 هو 4 (ثلاث حمراء وواحدة خضراء).
  عدد الاختيارات هو C(4,2)=6.

• (-3, -1, 1, 3): نختار -3، -1، 3، وواحدة من الكريتين اللتين تحملان الرقم 1.
  عدد الاختيارات هو 2.

إذن عدد الحالات الملائمة هو:
6+2=8

P(C)=8/126=4/63

2) المتغير العشوائي X:
في البداية توجد 3 كريات خضراء.
نسحب 4 كريات. إذا كان عدد الكريات الخضراء المسحوبة هو Y، فإن:
X=3-Y

عدد الكريات الخضراء المسحوبة Y يمكن أن يكون 0 أو 1 أو 2 أو 3.
إذن قيم X هي:
0، 1، 2، 3

قانون احتمال X:

• X=3 يعني لم نسحب أي كرية خضراء:
  نختار 4 كريات من غير الخضراء، وعددها 6.
  P(X=3)=C(6,4)/C(9,4)=15/126=5/42

• X=2 يعني سحبنا كرية خضراء واحدة:
  P(X=2)=C(3,1)C(6,3)/C(9,4)=3×20/126=60/126=10/21

• X=1 يعني سحبنا كريتين خضراوين:
  P(X=1)=C(3,2)C(6,2)/C(9,4)=3×15/126=45/126=5/14

• X=0 يعني سحبنا ثلاث كريات خضراء:
  P(X=0)=C(3,3)C(6,1)/C(9,4)=6/126=1/21

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=1/21، P(X=1)=5/14، P(X=2)=10/21، P(X=3)=5/42.<br>
تدقيق: 2/42+15/42+20/42+5/42=42/42=1 ✓</p>

الأمل الرياضي:
E(X)=0×1/21 + 1×5/14 + 2×10/21 + 3×5/42
=5/14+20/21+15/42
=15/42+40/42+15/42
=70/42
=5/3

<p class="property-box"><strong>النتيجة:</strong> E(X)=5/3.</p>

ج) حساب P(X^2-X>0):
X^2-X=X(X-1)
وبما أن X يأخذ القيم 0، 1، 2، 3، فإن:
X(X-1)>0 عندما X=2 أو X=3.

إذن:
P(X^2-X>0)=P(X=2)+P(X=3)
=10/21+5/42
=20/42+5/42
=25/42

<p class="property-box"><strong>النتيجة:</strong> P(X^2-X>0)=25/42.</p>`
  },
  {
    id: 17,
    track: "math",
    year: 2009,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

كيس به 10 كريات متماثلة لا نميز بينها عند اللمس، منها 4 بيضاء و6 حمراء.

1) نسحب عشوائيًا من الكيس 3 كريات في آن واحد.
أ) احسب احتمال الحصول على 3 كريات بيضاء.
ب) احسب احتمال الحصول على الأقل على كرية حمراء.

2) ليكن X المتغير العشوائي الذي يرفق بكل عملية سحب عدد الكريات البيضاء المسحوبة.
عرّف قانون الاحتمال للمتغير العشوائي X، واحسب أمله الرياضي E(X).

3) نسحب من الكيس في آن واحد 3 كريات خمس مرات على التوالي مع الإعادة.
احسب احتمال الحصول على 3 كريات بيضاء مرتين بالضبط.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 10 كريات (4 بيضاء و6 حمراء)، نسحب 3 كريات في آن واحد. عدد الحالات C(10,3)=120.</div>

1) السحب في آن واحد:

أ) احتمال الحصول على 3 كريات بيضاء:
عدد الكريات البيضاء هو 4.
عدد الحالات الملائمة:
C(4,3)=4

إذن:
P= C(4,3)/C(10,3)=4/120=1/30

ب) احتمال الحصول على الأقل على كرية حمراء:
نستعمل المتممة.
الحادثة المتممة هي: الحصول على 3 كريات بيضاء.

إذن:
P(على الأقل كرية حمراء)=1-1/30=29/30

2) قانون احتمال X:
X هو عدد الكريات البيضاء المسحوبة عند سحب 3 كريات.
بما أن عدد البيضاء 4 والحمراء 6، فإن قيم X هي:
0، 1، 2، 3

قانون X:
• P(X=0)=C(4,0)C(6,3)/C(10,3)=1×20/120=1/6
• P(X=1)=C(4,1)C(6,2)/C(10,3)=4×15/120=1/2
• P(X=2)=C(4,2)C(6,1)/C(10,3)=6×6/120=3/10
• P(X=3)=C(4,3)C(6,0)/C(10,3)=4×1/120=1/30

<p class="property-box"><strong>تدقيق:</strong> 1/6+1/2+3/10+1/30=20/120+60/120+36/120+4/120=120/120=1 ✓</p>

الأمل الرياضي:
E(X)=0×1/6 + 1×1/2 + 2×3/10 + 3×1/30
=1/2+6/10+3/30
=15/30+18/30+3/30
=36/30
=6/5

<p class="property-box"><strong>النتيجة:</strong> E(X)=6/5.</p>

<p class="definition-box"><strong>تحقق بديل:</strong> X يتبع توزيعًا فائقًا هندسيًا (Hypergeometric) مع N=10، K=4 (الكريات البيضاء)، n=3 (عدد السحب). إذن E(X)=nK/N=3×4/10=6/5 ✓</p>

3) تكرار التجربة 5 مرات مع الإعادة:
نعتبر النجاح هو: الحصول على 3 كريات بيضاء في سحب واحد.
احتمال النجاح:
p=1/30

عدد التكرارات:
n=5

نريد النجاح مرتين بالضبط، إذن نستعمل القانون الثنائي:
Y~B(5,1/30)

P(Y=2)=C_5^2(1/30)^2(29/30)^3
=10×(1/900)×(29/30)^3
=10×29^3/30^5

<p class="property-box"><strong>النتيجة:</strong> P(Y=2)=10·29³/30⁵.</p>`
  },
  {
    id: 18,
    track: "technical",
    year: 2025,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق على 10 كريات متماثلة لا نفرق بينها باللمس، منها:
كرتان خضراوان مرقمتان بـ: 1، 2.
وثلاث كريات بيضاء مرقمة بـ: 1، 1، 2.
وخمس كريات حمراء مرقمة بـ: 1، 1، 1، 2، 3.

I) نسحب عشوائيًا من الصندوق 3 كريات في آن واحد، ونعتبر الحوادث الآتية:
A: الحصول على 3 كريات مختلفة الألوان مثنى مثنى.
B: الحصول على 3 كريات تحمل نفس الرقم.
C: الحصول على 3 كريات مجموع أرقامها 6.

1) أ) احسب P(A)، P(B)، P(C) على الترتيب.
ب) احسب P(A∩B)، ثم استنتج P(A∪B).

2) المتغير العشوائي X يرفق بكل عملية سحب 3 كريات بالكيفية السابقة عدد ألوان الكريات المسحوبة.
عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي.

II) نسحب عشوائيًا من الصندوق 3 كريات على التوالي دون إرجاع.
ما احتمال أن لا يبقى في الصندوق أية كرية خضراء؟`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 10 كريات (2 خضراء، 3 بيضاء، 5 حمراء). نسحب 3 كريات في آن واحد؛ C(10,3)=120.</div>

توزيع الألوان:
• خضراء: 2
• بيضاء: 3
• حمراء: 5

توزيع الأرقام:
• الرقم 1: خضراء واحدة + بيضاوان + ثلاث حمراء = 6 كريات
• الرقم 2: خضراء واحدة + بيضاء واحدة + حمراء واحدة = 3 كريات
• الرقم 3: حمراء واحدة = 1 كرية

I) 1) أ) حساب P(A):
A: الحصول على 3 كريات مختلفة الألوان (خضراء وبيضاء وحمراء).
عدد الحالات الملائمة:
C(2,1)×C(3,1)×C(5,1)=2×3×5=30

P(A)=30/120=1/4

حساب P(B):
B: الحصول على 3 كريات تحمل نفس الرقم.
نحسب حسب الرقم:
• ثلاث كريات تحمل الرقم 1: C(6,3)=20
• ثلاث كريات تحمل الرقم 2: C(3,3)=1
• ثلاث كريات تحمل الرقم 3: غير ممكن (كرية واحدة فقط)

عدد الحالات الملائمة:
20+1=21

P(B)=21/120=7/40

حساب P(C):
C: الحصول على 3 كريات مجموع أرقامها 6.
الأرقام الممكنة من 1، 2، 3.
المجموع 6 يتحقق في الحالتين:
• (1,2,3): نختار كرة رقمها 1 وواحدة رقمها 2 وواحدة رقمها 3.
  عدد الحالات: 6×3×1=18
• (2,2,2): نختار ثلاث كريات تحمل الرقم 2.
  عدد الحالات: C(3,3)=1

إذن عدد الحالات الملائمة:
18+1=19

P(C)=19/120

1) ب) حساب P(A∩B):
A∩B يعني ثلاث كريات مختلفة الألوان وتحمل نفس الرقم.

• الرقم 1 موجود في الألوان الثلاثة:
  خضراء: 1، بيضاء: 2، حمراء: 3
  عدد الاختيارات: 1×2×3=6
• الرقم 2 موجود في الألوان الثلاثة:
  خضراء: 1، بيضاء: 1، حمراء: 1
  عدد الاختيارات: 1×1×1=1

إذن عدد حالات A∩B هو 6+1=7

P(A∩B)=7/120

استنتاج P(A∪B):
P(A∪B)=P(A)+P(B)-P(A∩B)
=30/120+21/120-7/120
=44/120=11/30

2) قانون احتمال X:
X هو عدد ألوان الكريات المسحوبة.
القيم الممكنة: 1، 2، 3.

• X=1: الكريات الثلاث من نفس اللون.
  لا يمكن من الخضراء لأن عددها 2.
  من البيضاء: C(3,3)=1
  من الحمراء: C(5,3)=10
  إذن P(X=1)=11/120

• X=3: الكريات من الألوان الثلاثة، وهذا هو الحدث A.
  P(X=3)=P(A)=30/120=1/4

• X=2:
  P(X=2)=1-P(X=1)-P(X=3)
  =1-11/120-30/120
  =79/120

<p class="property-box"><strong>قانون X:</strong><br>
P(X=1)=11/120، P(X=2)=79/120، P(X=3)=30/120.<br>
تدقيق: 11+79+30=120 ✓</p>

الأمل الرياضي:
E(X)=1×11/120 + 2×79/120 + 3×30/120
=(11+158+90)/120
=259/120

<p class="property-box"><strong>النتيجة:</strong> E(X)=259/120.</p>

II) السحب على التوالي دون إرجاع:
نريد أن لا يبقى في الصندوق أية كرية خضراء بعد سحب 3 كريات.
بما أن في الصندوق كرتين خضراوين فقط، فهذا يعني أن السحب يجب أن يحتوي الكرتين الخضراوين مع كرية ثالثة من غير الخضراء.

نحسب بالاختيارات لأن السحب دون إرجاع، واحتمال نفس الحدث لا يتغير بالترتيب:
عدد السحبات الممكنة لثلاث كريات هو C(10,3)=120

الحالات الملائمة:
نختار الكرتين الخضراوين: C(2,2)=1
ونختار كرية واحدة من غير الخضراء (عددها 8): C(8,1)=8

إذن:
P=8/120=1/15

<p class="property-box"><strong>النتيجة:</strong> احتمال عدم بقاء أي كرية خضراء هو 1/15.</p>`
  },
  {
    id: 19,
    track: "technical",
    year: 2025,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق على 12 كرية منها: 3 كريات خضراء، 4 كريات بيضاء، و5 كريات حمراء.
كل الكريات متماثلة ولا نفرق بينها باللمس.

I) نسحب عشوائيًا من الصندوق 4 كريات في آن واحد، ونعتبر الحوادث الآتية:
A: الحصول على 3 كريات بالضبط من نفس اللون.
B: لا نحصل على أية كرية بيضاء.
C: الحصول على كرية واحدة بيضاء على الأقل.

1) أ) احسب P(A)، P(B)، P(C) على الترتيب.
ب) احسب P(A∩B)، ثم استنتج P(A∪B).

2) المتغير العشوائي X يرفق بكل عملية سحب 4 كريات بالكيفية السابقة عدد الكريات الخضراء المسحوبة.
عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي.

II) نسحب عشوائيًا من الصندوق 4 كريات على التوالي دون إرجاع.
ما احتمال ألا يبقى في الصندوق أية كرية خضراء؟`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 12 كرية (3 خضراء، 4 بيضاء، 5 حمراء). نسحب 4 كريات في آن واحد؛ C(12,4)=495.</div>

I) 1) أ) حساب P(A):
A: الحصول على 3 كريات بالضبط من نفس اللون ضمن سحب 4 كريات.
نعد الحالات حسب اللون الذي يظهر منه 3 كريات، مع اختيار الكرية الرابعة من لون آخر.

• 3 خضراء وكرية غير خضراء:
  C(3,3)×C(9,1)=9
• 3 بيضاء وكرية غير بيضاء:
  C(4,3)×C(8,1)=4×8=32
• 3 حمراء وكرية غير حمراء:
  C(5,3)×C(7,1)=10×7=70

إذن عدد حالات A:
9+32+70=111

P(A)=111/495=37/165

حساب P(B):
B: لا نحصل على أية كرية بيضاء.
أي نسحب 4 كريات من غير البيضاء، وعدد غير البيضاء هو 3+5=8.

P(B)=C(8,4)/C(12,4)=70/495=14/99

حساب P(C):
C: الحصول على كرية واحدة بيضاء على الأقل.
وهي متممة الحادثة B.

P(C)=1-P(B)=1-14/99=85/99

1) ب) حساب P(A∩B):
A∩B: الحصول على 3 كريات بالضبط من نفس اللون، ودون أي كرية بيضاء.
إذن نستعمل فقط الخضراء والحمراء.

• 3 خضراء وكرية حمراء:
  C(3,3)×C(5,1)=5
• 3 حمراء وكرية خضراء:
  C(5,3)×C(3,1)=10×3=30

إذن عدد حالات A∩B:
5+30=35

P(A∩B)=35/495=7/99

استنتاج P(A∪B):
P(A∪B)=P(A)+P(B)-P(A∩B)

نوحد المقامات إلى 495:
P(A)=111/495، P(B)=70/495، P(A∩B)=35/495

P(A∪B)=111/495+70/495-35/495
=146/495

2) قانون احتمال X:
X هو عدد الكريات الخضراء المسحوبة عند سحب 4 كريات.
عدد الكريات الخضراء هو 3، لذلك قيم X هي:
0، 1، 2، 3

• P(X=0)=C(3,0)C(9,4)/C(12,4)=1×126/495=14/55
• P(X=1)=C(3,1)C(9,3)/C(12,4)=3×84/495=28/55
• P(X=2)=C(3,2)C(9,2)/C(12,4)=3×36/495=12/55
• P(X=3)=C(3,3)C(9,1)/C(12,4)=1×9/495=1/55

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=14/55، P(X=1)=28/55، P(X=2)=12/55، P(X=3)=1/55.<br>
تدقيق: 14+28+12+1=55 ✓</p>

الأمل الرياضي:
E(X)=0×14/55 + 1×28/55 + 2×12/55 + 3×1/55
=(28+24+3)/55
=55/55
=1

<p class="property-box"><strong>النتيجة:</strong> E(X)=1.</p>

II) السحب على التوالي دون إرجاع:
نريد ألا يبقى في الصندوق أية كرية خضراء بعد سحب 4 كريات.
بما أن عدد الكريات الخضراء هو 3، فهذا يعني أن السحب يجب أن يحتوي الكريات الخضراء الثلاث ومعها كرية واحدة غير خضراء.

نحسب بالاختيارات (الترتيب لا يؤثر على الاحتمال):
عدد السحبات الممكنة: C(12,4)=495

الحالات الملائمة:
C(3,3)×C(9,1)=9

إذن:
P=9/495=1/55

<p class="property-box"><strong>النتيجة:</strong> احتمال ألا يبقى أي كرية خضراء هو 1/55.</p>`
  },
  {
    id: 20,
    track: "technical",
    year: 2024,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق على 9 كريات متماثلة لا نفرق بينها باللمس، منها: 4 بيضاء و3 حمراء و2 خضراء.

I) نسحب عشوائيًا من الصندوق 3 كريات في آن واحد.

1) احسب احتمال كل من الحوادث الآتية:
A: الحصول على ثلاث كريات من نفس اللون.
B: الحصول على الألوان الثلاثة.
C: الحصول على كرية بيضاء على الأقل.

2) المتغير العشوائي X يرفق بكل عملية سحب لثلاث كريات عدد الألوان المتحصل عليها.
أ) عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي E(X).
ب) احسب E(84X+1837).

II) نضيف الآن إلى الصندوق كرية واحدة سوداء، ثم نسحب منه عشوائيًا 4 كريات على التوالي دون إرجاع.
بيّن أن احتمال الحادثة D: الحصول على الألوان الأربعة هو 4/35.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 9 كريات (4 بيضاء، 3 حمراء، 2 خضراء). نسحب 3 كريات في آن واحد؛ C(9,3)=84.</div>

I) السحب في آن واحد:

1) حساب P(A):
A: الحصول على ثلاث كريات من نفس اللون.
لا يمكن الحصول على 3 خضراء لأن عدد الخضراء 2 فقط.

عدد الحالات الملائمة:
C(4,3)+C(3,3)=4+1=5

P(A)=5/84

حساب P(B):
B: الحصول على الألوان الثلاثة.
أي نختار كرية بيضاء وكرية حمراء وكرية خضراء.

عدد الحالات الملائمة:
C(4,1)×C(3,1)×C(2,1)=4×3×2=24

P(B)=24/84=2/7

حساب P(C):
C: الحصول على كرية بيضاء على الأقل.
نستعمل المتممة: لا نحصل على أي كرية بيضاء.
عدد غير البيضاء هو 3+2=5.

P(C)=1-C(5,3)/C(9,3)
=1-10/84
=74/84=37/42

2) قانون احتمال X:
X هو عدد الألوان المتحصل عليها عند سحب 3 كريات.
القيم الممكنة هي: 1، 2، 3.

• X=1 يعني ثلاث كريات من نفس اللون، أي الحادثة A:
  P(X=1)=5/84
• X=3 يعني الحصول على الألوان الثلاثة، أي الحادثة B:
  P(X=3)=24/84=2/7
• X=2:
  P(X=2)=1-P(X=1)-P(X=3)
  =1-5/84-24/84
  =55/84

<p class="property-box"><strong>قانون X:</strong><br>
P(X=1)=5/84، P(X=2)=55/84، P(X=3)=24/84.<br>
تدقيق: 5+55+24=84 ✓</p>

الأمل الرياضي:
E(X)=1×5/84 + 2×55/84 + 3×24/84
=(5+110+72)/84
=187/84

<p class="property-box"><strong>النتيجة:</strong> E(X)=187/84.</p>

حساب E(84X+1837):
باستعمال خاصية خطية الأمل:
E(84X+1837)=84E(X)+1837
=84×187/84+1837
=187+1837
=2024

<p class="property-box"><strong>النتيجة:</strong> E(84X+1837)=2024.</p>

II) بعد إضافة كرية سوداء:
يصبح الصندوق يحتوي على:
4 بيضاء، 3 حمراء، 2 خضراء، 1 سوداء.
المجموع 10 كريات.

نسحب 4 كريات دون إرجاع.
الحادثة D: الحصول على الألوان الأربعة.
أي نختار 1 بيضاء، 1 حمراء، 1 خضراء، 1 سوداء.

عدد الحالات الملائمة:
C(4,1)×C(3,1)×C(2,1)×C(1,1)=4×3×2×1=24

عدد الحالات الممكنة:
C(10,4)=210

إذن:
P(D)=24/210=4/35

<p class="property-box"><strong>التبيان:</strong> P(D)=4/35 ✓</p>`
  },
  {
    id: 21,
    track: "technical",
    year: 2024,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 10 كرات متماثلة لا نفرق بينها باللمس، منها:
كرتان تحملان الرقم 0، وثلاث كرات تحمل الرقم 2، وكرية واحدة تحمل الرقم 3، وأربع كرات تحمل الرقم 4.

نسحب عشوائيًا من الكيس ثلاث كريات في آن واحد.

1) احسب احتمال كل من الحوادث الآتية:
A: مجموع الأعداد التي تحملها الكريات المسحوبة يساوي 12.
B: الحصول على ثلاثة أعداد أولية.
C: جداء الأعداد التي تحملها الكريات المسحوبة معدوم.

2) المتغير العشوائي X يرفق بكل عملية سحب لثلاث كريات عدد الأعداد الأولية المتحصل عليها.
أ) عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي E(X).
ب) احسب احتمال الحادثة: X^2 > e.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 10 كرات مرقمة: 0(2)، 2(3)، 3(1)، 4(4). نسحب 3 كرات في آن واحد؛ C(10,3)=120.</div>

توزيع الأرقام:
• الرقم 0: كرتان
• الرقم 2: ثلاث كرات
• الرقم 3: كرية واحدة
• الرقم 4: أربع كرات

1) حساب P(A):
A: مجموع الأعداد يساوي 12.
بما أن أكبر رقم هو 4، فلا يمكن أن يكون المجموع 12 إلا بالحالة:
4+4+4=12

عدد الحالات الملائمة:
C(4,3)=4

إذن:
P(A)=4/120=1/30

حساب P(B):
B: الحصول على ثلاثة أعداد أولية.
الأعداد الأولية الموجودة هي 2 و3.
عدد الكرات التي تحمل عددًا أوليًا:
3 كرات تحمل 2 + كرية واحدة تحمل 3 = 4 كرات.

نريد سحب 3 كرات من هذه الأربع:
C(4,3)=4

إذن:
P(B)=4/120=1/30

حساب P(C):
C: جداء الأعداد معدوم.
يكون الجداء معدومًا إذا سحبنا على الأقل كرة تحمل الرقم 0.
نستعمل المتممة: لا نسحب أي كرة تحمل 0.
عدد الكرات غير الصفرية هو 8.

P(C)=1-C(8,3)/C(10,3)
=1-56/120
=64/120=8/15

2) قانون احتمال X:
X هو عدد الأعداد الأولية المتحصل عليها في السحب.
عدد الكرات الأولية هو 4، وعدد الكرات غير الأولية هو 6 (الصفرية والرقم 4).
قيم X هي: 0، 1، 2، 3.

• P(X=0)=C(4,0)C(6,3)/C(10,3)=1×20/120=1/6
• P(X=1)=C(4,1)C(6,2)/C(10,3)=4×15/120=1/2
• P(X=2)=C(4,2)C(6,1)/C(10,3)=6×6/120=3/10
• P(X=3)=C(4,3)C(6,0)/C(10,3)=4×1/120=1/30

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=1/6، P(X=1)=1/2، P(X=2)=3/10، P(X=3)=1/30.<br>
تدقيق: 20+60+36+4=120 ✓</p>

الأمل الرياضي:
E(X)=0×1/6 + 1×1/2 + 2×3/10 + 3×1/30
=1/2+6/10+3/30
=15/30+18/30+3/30
=36/30=6/5

<p class="property-box"><strong>النتيجة:</strong> E(X)=6/5.</p>

ب) حساب P(X^2 > e):
بما أن e≈2.718.
نختبر قيم X:
• إذا X=0 فإن X^2=0 ليس أكبر من e.
• إذا X=1 فإن X^2=1 ليس أكبر من e.
• إذا X=2 فإن X^2=4 أكبر من e.
• إذا X=3 فإن X^2=9 أكبر من e.

إذن:
P(X^2>e)=P(X=2)+P(X=3)
=3/10+1/30
=9/30+1/30
=10/30=1/3

<p class="property-box"><strong>النتيجة:</strong> P(X^2>e)=1/3.</p>`
  },
  {
    id: 22,
    track: "technical",
    year: 2023,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 8 كرات متماثلة ولا نفرق بينها باللمس، موزعة كما يلي:
3 كريات بيضاء مرقمة بـ: 0، 1، 1.
و3 كريات حمراء مرقمة بـ: 1، 1، 2.
وكريتان خضراوان مرقمتان بـ: 1، 2.

نسحب عشوائيًا وفي آن واحد كرتين من الكيس، ونعتبر الحوادث الآتية:
A: الحصول على كرتين من نفس اللون.
B: الحصول على كرية حمراء على الأقل.
C: الحصول على كرتين تحملان رقمين مجموعهما يساوي 3.

1) أ) بيّن أن احتمال الحدث A يساوي 1/4، وأن احتمال الحدث B يساوي 9/14.
ب) احسب الاحتمال P(C).

2) نعتبر المتغير العشوائي X الذي يرفق بكل عملية سحب لكرتين مجموع الرقمين المسجلين عليهما.
أ) برّر أن مجموعة قيم المتغير العشوائي X هي {1،2،3،4}.
ب) عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 8 كرات (3 بيضاء: 0,1,1؛ 3 حمراء: 1,1,2؛ 2 خضراء: 1,2). نسحب كرتين في آن واحد؛ C(8,2)=28.</div>

توزيع الألوان:
• بيضاء: 3
• حمراء: 3
• خضراء: 2

توزيع الأرقام:
• الرقم 0: كرة واحدة
• الرقم 1: خمس كرات
• الرقم 2: كرتان

1) أ) حساب P(A):
A: الحصول على كرتين من نفس اللون.
عدد الحالات الملائمة:
C(3,2)+C(3,2)+C(2,2)=3+3+1=7

إذن:
P(A)=7/28=1/4

حساب P(B):
B: الحصول على كرية حمراء على الأقل.
نستعمل المتممة: لا نحصل على أي كرية حمراء.
عدد الكرات غير الحمراء هو 5 (3 بيضاء + 2 خضراء).

P(B)=1-C(5,2)/C(8,2)
=1-10/28
=18/28=9/14

1) ب) حساب P(C):
C: الحصول على كرتين مجموع رقميهما يساوي 3.
بما أن الأرقام الموجودة هي 0، 1، 2، فإن المجموع 3 يتحقق فقط عند:
1+2=3

عدد الكرات التي تحمل الرقم 1 هو 5.
عدد الكرات التي تحمل الرقم 2 هو 2.

عدد الحالات الملائمة:
5×2=10

إذن:
P(C)=10/28=5/14

2) المتغير العشوائي X:
X هو مجموع الرقمين المسجلين على الكرتين المسحوبتين.
أصغر مجموع ممكن هو 0+1=1، لأن هناك كرة واحدة فقط تحمل 0.
وأكبر مجموع ممكن هو 2+2=4، لأن هناك كرتين تحملان 2.
إذن:
X(Ω)={1,2,3,4}

قانون احتمال X:
• X=1 يتحقق عند 0+1:
  عدد الحالات = 1×5=5
  P(X=1)=5/28
• X=2 يتحقق عند 0+2 أو 1+1:
  عدد الحالات = 1×2 + C(5,2)=2+10=12
  P(X=2)=12/28=3/7
• X=3 يتحقق عند 1+2:
  عدد الحالات = 5×2=10
  P(X=3)=10/28=5/14
• X=4 يتحقق عند 2+2:
  عدد الحالات = C(2,2)=1
  P(X=4)=1/28

<p class="property-box"><strong>قانون X:</strong><br>
P(X=1)=5/28، P(X=2)=12/28، P(X=3)=10/28، P(X=4)=1/28.<br>
تدقيق: 5+12+10+1=28 ✓</p>

الأمل الرياضي:
E(X)=1×5/28 + 2×12/28 + 3×10/28 + 4×1/28
=(5+24+30+4)/28
=63/28
=9/4

<p class="property-box"><strong>النتيجة:</strong> E(X)=9/4.</p>`
  },
  {
    id: 23,
    track: "technical",
    year: 2023,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 11 كرية متماثلة ولا نفرق بينها باللمس، موزعة كما يلي:
3 كريات تحمل الرقم 0.
3 كريات تحمل الرقم 1.
5 كريات تحمل الرقم 2.

نسحب عشوائيًا وفي آن واحد كرتين من الكيس، ونعتبر الحوادث A وB وC الآتية:
A: الحصول على كرتين رقم كل منهما عدد أولي.
B: الحصول على كرية واحدة تحمل رقمًا فرديًا.
C: الحصول على كرتين جداء رقميهما معدوم.

1) أ) بيّن أن احتمال الحدث A يساوي 2/11، وأن احتمال الحدث B يساوي 24/55.
ب) احسب الاحتمال P(C).

2) نعتبر المتغير العشوائي X الذي يرفق بكل عملية سحب لكرتين جداء الرقمين المسجلين عليهما.
أ) برّر أن مجموعة قيم المتغير العشوائي X هي {0،1،2،4}.
ب) عين قانون احتمال المتغير العشوائي X، ثم احسب أمله الرياضي E(X).
ج) احسب احتمال الحدث: e^(X+6) < 2023.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 11 كرية (3 تحمل 0، 3 تحمل 1، 5 تحمل 2). نسحب كرتين في آن واحد؛ C(11,2)=55.</div>

1) أ) حساب P(A):
A: الحصول على كرتين رقم كل منهما عدد أولي.
العدد الأولي الموجود بين 0 و1 و2 هو 2 فقط.
إذن نحتاج إلى سحب كرتين تحملان الرقم 2.

عدد الحالات الملائمة:
C(5,2)=10

إذن:
P(A)=10/55=2/11

حساب P(B):
B: الحصول على كرية واحدة تحمل رقمًا فرديًا.
الرقم الفردي الموجود هو 1 فقط، وعدد كراته 3.
نريد بالضبط كرية واحدة تحمل 1، والكرية الأخرى لا تحمل 1.
عدد غير الرقم 1 هو 8.

عدد الحالات الملائمة:
C(3,1)×C(8,1)=3×8=24

إذن:
P(B)=24/55

1) ب) حساب P(C):
C: الحصول على كرتين جداء رقميهما معدوم.
يكون الجداء معدومًا إذا كانت إحدى الكرتين على الأقل تحمل الرقم 0.
نستعمل المتممة: لا نسحب أي كرة تحمل 0.
عدد الكرات غير الصفرية هو 8.

P(C)=1-C(8,2)/C(11,2)
=1-28/55
=27/55

2) المتغير العشوائي X:
X هو جداء الرقمين المسجلين على الكرتين المسحوبتين.
الأرقام الممكنة هي 0، 1، 2.
إذن جداءات زوجين ممكنة:
0، 1×1=1، 1×2=2، 2×2=4

إذن:
X(Ω)={0,1,2,4}

قانون احتمال X:

• X=0: هو الحدث C.
  P(X=0)=27/55

• X=1: نحتاج إلى سحب كرتين تحملان الرقم 1.
  P(X=1)=C(3,2)/55=3/55

• X=2: نحتاج إلى سحب كرية تحمل 1 وكرية تحمل 2.
  P(X=2)=C(3,1)C(5,1)/55=15/55=3/11

• X=4: نحتاج إلى سحب كرتين تحملان الرقم 2.
  P(X=4)=C(5,2)/55=10/55=2/11

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=27/55، P(X=1)=3/55، P(X=2)=15/55، P(X=4)=10/55.<br>
تدقيق: 27+3+15+10=55 ✓</p>

الأمل الرياضي:
E(X)=0×27/55 + 1×3/55 + 2×15/55 + 4×10/55
=(3+30+40)/55
=73/55

<p class="property-box"><strong>النتيجة:</strong> E(X)=73/55.</p>

2) ج) حساب P(e^(X+6)<2023):
نأخذ اللوغاريتم الطبيعي:
e^(X+6)<2023 يعادل X+6<ln(2023)

وبما أن:
e^7≈1096 و e^8≈2981
فإن:
7<ln(2023)<8

إذن:
1<ln(2023)-6<2

وبما أن X يأخذ القيم 0،1،2،4، فإن الشرط X<ln(2023)-6 يتحقق فقط عند:
X=0 أو X=1

إذن:
P(e^(X+6)<2023)=P(X=0)+P(X=1)
=27/55+3/55
=30/55=6/11

<p class="property-box"><strong>النتيجة:</strong> P(e^(X+6)<2023)=6/11.</p>`
  },
  {
    id: 24,
    track: "technical",
    year: 2020,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على أربع كريات حمراء مرقمة بـ: 2، 2، 2، 2، وثلاث كريات خضراء مرقمة بـ: 3، 3، 2.
الكريات لا نفرق بينها باللمس.
نسحب عشوائيًا وفي آن واحد كرتين من هذا الكيس.

1) نعتبر الحادثتين:
A: الحصول على كرتين تحملان نفس الرقم.
B: الحصول على كرتين مختلفتين في اللون.

أ) احسب احتمال كل من الحادثتين A وB.
ب) بيّن أن احتمال الحصول على كرتين تحملان نفس الرقم ومختلفتين في اللون يساوي 4/21.
ج) استنتج احتمال الحصول على كرتين تحملان نفس الرقم أو مختلفتين في اللون.

2) ليكن X المتغير العشوائي الذي يرفق بكل سحب جداء الرقمين الظاهرين على الكرتين المسحوبتين.
عرّف قانون احتمال المتغير العشوائي X.

3) في لعبة، يقوم اللاعب بسحب كرتين:
إذا كان جداؤهما 4 يربح x^2 دينار.
إذا كان جداؤهما 6 يخسر y^2 دينار.
وإذا كان جداؤهما 9 يخسر 130 دينار.
حيث x وy عددان طبيعيان غير معدومين.
عين قيمة كل من x وy حتى تكون هذه اللعبة عادلة.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 7 كريات (4 حمراء كلها 2؛ 3 خضراء: اثنتان 3 وواحدة 2). نسحب كرتين في آن واحد؛ C(7,2)=21.</div>

توزيع الكريات:
• حمراء: أربع كريات كلها تحمل الرقم 2.
• خضراء: كريتان تحملان الرقم 3 وكرية واحدة تحمل الرقم 2.

إذن توزيع الأرقام:
• الرقم 2: خمس كريات
• الرقم 3: كريتان

1) أ) حساب P(A):
A: الحصول على كرتين تحملان نفس الرقم.
إما كرتان تحملان 2 أو كرتان تحملان 3.

عدد الحالات الملائمة:
C(5,2)+C(2,2)=10+1=11

إذن:
P(A)=11/21

حساب P(B):
B: الحصول على كرتين مختلفتين في اللون.
أي كرية حمراء وكرية خضراء.

عدد الحالات الملائمة:
4×3=12

إذن:
P(B)=12/21=4/7

1) ب) حساب احتمال نفس الرقم ومختلفتين في اللون:
نريد كرتين تحملان نفس الرقم ومن لونين مختلفين.
الرقم المشترك بين اللونين هو 2 فقط.
نختار كرية حمراء تحمل 2 من بين 4، وكرية خضراء تحمل 2 من بين 1.

عدد الحالات الملائمة:
4×1=4

إذن:
P(A∩B)=4/21

1) ج) استنتاج P(A∪B):
P(A∪B)=P(A)+P(B)-P(A∩B)
=11/21+12/21-4/21
=19/21

2) قانون احتمال X:
X هو جداء الرقمين الظاهرين على الكرتين.
الأرقام الممكنة هي 2 و3، لذلك قيم X هي:
4، 6، 9

• X=4 يحدث عند سحب كرتين تحملان الرقم 2:
  P(X=4)=C(5,2)/C(7,2)=10/21
• X=6 يحدث عند سحب كرية تحمل 2 وكرية تحمل 3:
  P(X=6)=5×2/21=10/21
• X=9 يحدث عند سحب كرتين تحملان الرقم 3:
  P(X=9)=C(2,2)/21=1/21

<p class="property-box"><strong>قانون X:</strong><br>
P(X=4)=10/21، P(X=6)=10/21، P(X=9)=1/21.<br>
تدقيق: 10+10+1=21 ✓</p>

3) شرط عدالة اللعبة:
اللعبة عادلة إذا كان أمل الربح يساوي 0.

الربح العشوائي G يأخذ:
• x^2 عند X=4 باحتمال 10/21.
• -y^2 عند X=6 باحتمال 10/21.
• -130 عند X=9 باحتمال 1/21.

إذن:
E(G)=x^2×10/21 - y^2×10/21 - 130×1/21

شرط العدالة:
E(G)=0

10x^2 - 10y^2 - 130 = 0
10(x^2-y^2)=130
x^2-y^2=13

أي:
(x-y)(x+y)=13

وبما أن x وy عددان طبيعيان غير معدومين و13 عدد أولي، فإن:
x-y=1
x+y=13

بحل النظام:
2x=14
x=7
y=6

<p class="property-box"><strong>النتيجة:</strong> تكون اللعبة عادلة من أجل x=7 و y=6.</p>

<p class="definition-box"><strong>تحقق:</strong> بالتعويض في E(G):<br>
E(G)=10×7²/21 - 10×6²/21 - 130/21<br>
=(490-360-130)/21<br>
=0/21=0 ✓</p>`
  },
  {
    id: 25,
    track: "technical",
    year: 2020,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على:
كرتين خضراوين تحملان الرقمين 1 و2.
وثلاث كرات حمراء تحمل الأرقام 1 و2 و2.
وأربع كرات بيضاء تحمل الأرقام 2 و3 و3 و4.
كل الكرات متماثلة لا نفرق بينها باللمس.

I) نسحب من هذا الكيس 3 كريات في آن واحد.

1) احسب احتمال كل من الحادثتين A وB التاليتين:
A: الحصول على 3 كريات من نفس اللون.
B: الحصول على كرية بيضاء على الأقل.

2) ليكن X المتغير العشوائي الذي يرفق بكل سحب أكبر الأرقام المتحصل عليها.
أ) بيّن أن P(X=3)=3/7، ثم عرّف قانون الاحتمال للمتغير العشوائي X.
ب) احسب الأمل الرياضي للمتغير العشوائي X.

II) نسحب الآن 3 كريات على التوالي دون إرجاع.
ليكن C الحدث: الحصول على 3 أرقام جداؤها عدد زوجي.
احسب احتمال C.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 9 كرات (2 خضراء: 1,2؛ 3 حمراء: 1,2,2؛ 4 بيضاء: 2,3,3,4). نسحب 3 كريات في آن واحد؛ C(9,3)=84.</div>

توزيع الألوان:
• خضراء: 2
• حمراء: 3
• بيضاء: 4

توزيع الأرقام:
• الرقم 1: كرتان
• الرقم 2: أربع كرات
• الرقم 3: كرتان
• الرقم 4: كرية واحدة

I) 1) حساب P(A):
A: الحصول على 3 كريات من نفس اللون.
لا يمكن 3 خضراء لأن عدد الخضراء 2.
يمكن 3 حمراء أو 3 بيضاء.

عدد الحالات الملائمة:
C(3,3)+C(4,3)=1+4=5

P(A)=5/84

حساب P(B):
B: الحصول على كرية بيضاء على الأقل.
نستعمل المتممة: لا نحصل على أي كرية بيضاء.
عدد غير البيضاء هو 5.

P(B)=1-C(5,3)/C(9,3)
=1-10/84
=74/84=37/42

2) المتغير العشوائي X:
X هو أكبر الأرقام المتحصل عليها في سحب 3 كريات.
الأرقام الممكنة هي 1،2،3،4، ولكن لا يمكن أن يكون أكبر رقم هو 1 لأن عدد الكرات التي تحمل 1 هو 2 فقط، ونحن نسحب 3 كريات.
إذن قيم X هي:
2، 3، 4

أ) تبيان P(X=3):
X=3 يعني أن أكبر رقم هو 3.
أي نسحب 3 كريات من الكرات التي أرقامها لا تتجاوز 3، مع وجود كرية واحدة على الأقل تحمل الرقم 3.

عدد الكرات التي أرقامها ≤3 هو:
2 (رقم 1) + 4 (رقم 2) + 2 (رقم 3) = 8

عدد السحبات من هذه الكرات:
C(8,3)=56

نطرح السحبات التي لا تحتوي الرقم 3، أي من الأرقام 1 و2 فقط (6 كرات):
C(6,3)=20

إذن عدد الحالات الملائمة:
56-20=36

P(X=3)=36/84=3/7

<p class="property-box"><strong>تبيان:</strong> P(X=3)=3/7 ✓</p>

قانون احتمال X:
• X=2 يعني أن كل الكرات المسحوبة أرقامها ≤2.
  عدد الكرات التي تحمل 1 أو 2 هو 6.
  P(X=2)=C(6,3)/C(9,3)=20/84=5/21
• X=4 يعني ظهور الكرية الوحيدة التي تحمل الرقم 4.
  نختار معها كريتين من باقي 8 كرات:
  P(X=4)=C(1,1)C(8,2)/C(9,3)=28/84=1/3

<p class="property-box"><strong>قانون X:</strong><br>
P(X=2)=5/21، P(X=3)=3/7، P(X=4)=1/3.<br>
تدقيق: 20/84+36/84+28/84=84/84=1 ✓</p>

ب) الأمل الرياضي:
E(X)=2×5/21 + 3×3/7 + 4×1/3
=10/21 + 9/7 + 4/3
=10/21+27/21+28/21
=65/21

<p class="property-box"><strong>النتيجة:</strong> E(X)=65/21.</p>

II) السحب على التوالي دون إرجاع:
C: الحصول على 3 أرقام جداؤها عدد زوجي.
يكون الجداء فرديًا فقط إذا كانت الأرقام الثلاثة كلها فردية.
الأرقام الفردية الموجودة هي 1 و3.
عدد الكرات ذات الأرقام الفردية:
• رقم 1: كرتان
• رقم 3: كرتان
المجموع 4 كرات.

نستعمل المتممة:
P(C)=1-P(سحب 3 كرات كلها فردية)

وبما أن السحب دون إرجاع، نحسب بالاختيارات:
P(كلها فردية)=C(4,3)/C(9,3)=4/84=1/21

إذن:
P(C)=1-1/21=20/21

<p class="property-box"><strong>النتيجة:</strong> P(C)=20/21.</p>`
  },
  {
    id: 26,
    track: "technical",
    year: 2019,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

توجد إجابة صحيحة واحدة من بين الأجوبة المقترحة في كل حالة من الحالات التالية. اختر الإجابة الصحيحة مبررًا اختيارك.

يحتوي كيس على ثلاث كريات بيضاء تحمل الأرقام 1، 2، 3، وكرتين سوداويتين تحملان الرقمين 1، 2.
الكريات لا نفرق بينها عند اللمس.
نسحب من الكيس 3 كريات عشوائيًا وفي آن واحد.

المتغير العشوائي X يرفق بكل سحب عدد الكريات السوداء المسحوبة.

1) قيم المتغير العشوائي X هي:
أ) {1,2,3}
ب) {0,2,3}
ج) {0,1,2}

2) الأمل الرياضي E(X) للمتغير العشوائي X هو:
أ) 4/5
ب) 6/5
ج) 11/10

3) احتمال الحصول على كرية واحدة سوداء تحمل الرقم 1 من الكريات المسحوبة يساوي:
أ) 7/10
ب) 9/10
ج) 3/5`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 5 كريات (3 بيضاء مرقمة 1,2,3؛ 2 سوداء مرقمة 1,2). نسحب 3 كريات في آن واحد؛ C(5,3)=10.</div>

1) قيم المتغير العشوائي X:
X هو عدد الكريات السوداء المسحوبة.
بما أن في الكيس كرتين سوداويتين فقط، فلا يمكن أن يكون X=3.
كما يمكن ألا نسحب أي كرة سوداء، أو نسحب واحدة، أو نسحب اثنتين.

إذن:
X(Ω)={0,1,2}

<p class="property-box"><strong>الإجابة الصحيحة هي: ج.</strong></p>

2) حساب قانون X ثم E(X):

• P(X=0): نسحب 3 كريات بيضاء من 3.
  P(X=0)=C(2,0)C(3,3)/C(5,3)=1/10
• P(X=1): نسحب كرة سوداء واحدة وكرتين بيضاوين.
  P(X=1)=C(2,1)C(3,2)/C(5,3)=2×3/10=6/10
• P(X=2): نسحب الكرتين السوداوين وكرية بيضاء واحدة.
  P(X=2)=C(2,2)C(3,1)/C(5,3)=3/10

<p class="property-box"><strong>قانون X:</strong> P(X=0)=1/10، P(X=1)=6/10، P(X=2)=3/10.<br>
تدقيق: 1/10+6/10+3/10=10/10=1 ✓</p>

الأمل الرياضي:
E(X)=0×1/10 + 1×6/10 + 2×3/10
=6/10+6/10
=12/10=6/5

<p class="property-box"><strong>الإجابة الصحيحة هي: ب.</strong></p>

3) احتمال الحصول على كرية واحدة سوداء تحمل الرقم 1 من الكريات المسحوبة:
في الكيس توجد كرة سوداء واحدة فقط تحمل الرقم 1.
نريد أن تكون هذه الكرة ضمن السحب.

نثبت هذه الكرة، ثم نختار الكريتين الباقيتين من بين 4 كريات أخرى:
C(4,2)=6

عدد الحالات الكلية:
C(5,3)=10

إذن:
P=6/10=3/5

<p class="property-box"><strong>الإجابة الصحيحة هي: ج.</strong></p>`
  },
  {
    id: 27,
    track: "technical",
    year: 2019,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على:
أربع كريات بيضاء تحمل الأرقام 1، 2، 3، 4.
وثلاث كريات حمراء تحمل الأرقام 1، 2، 3.
وكرتين سوداويتين تحملان الرقمين 1، 2.
كل الكريات متشابهة لا نفرق بينها عند اللمس.

نسحب عشوائيًا وفي آن واحد ثلاث كريات من هذا الكيس.

1) احسب احتمال الحوادث التالية:
أ) الحادثة A: الحصول على كرية بيضاء واحدة.
ب) الحادثة B: الحصول على كرتين بيضاوين على الأكثر.
ج) الحادثة C: الحصول على ثلاث كريات تحمل أرقامًا غير أولية.

2) نعتبر المتغير العشوائي X الذي يرفق بكل عملية سحب عدد الكريات التي تحمل أرقامًا أولية.
أ) عين قيم المتغير العشوائي X، ثم عرّف قانون احتماله.
ب) احسب P(X^2-X<=0).`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 9 كريات (4 بيضاء: 1,2,3,4؛ 3 حمراء: 1,2,3؛ 2 سوداء: 1,2). نسحب 3 كريات في آن واحد؛ C(9,3)=84.</div>

توزيع الألوان:
• بيضاء: 4
• حمراء: 3
• سوداء: 2

1) أ) حساب P(A):
A: الحصول على كرية بيضاء واحدة بالضبط.
نختار كرية بيضاء واحدة من 4، وكريتين غير بيضاوين من 5.

عدد الحالات الملائمة:
C(4,1)×C(5,2)=4×10=40

P(A)=40/84=10/21

1) ب) حساب P(B):
B: الحصول على كرتين بيضاوين على الأكثر.
نستعمل المتممة: أكثر من كرتين بيضاوين يعني 3 كريات بيضاء.

P(B)=1-C(4,3)/C(9,3)
=1-4/84
=80/84=20/21

1) ج) حساب P(C):
C: الحصول على ثلاث كريات تحمل أرقامًا غير أولية.
الأرقام الموجودة هي 1،2،3،4.
• الأعداد الأولية: 2 و3.
• الأعداد غير الأولية: 1 و4.

نعد الكريات التي تحمل عددًا غير أولي:
• الرقم 1 موجود في الأبيض والحمراء والسوداء: 3 كريات.
• الرقم 4 موجود في البيضاء فقط: كرية واحدة.
إذن عدد الكريات غير الأولية هو 4.

نريد سحب 3 كريات منها:
P(C)=C(4,3)/C(9,3)=4/84=1/21

2) المتغير العشوائي X:
X هو عدد الكريات التي تحمل أرقامًا أولية.
عدد الكريات ذات الأرقام الأولية:
• الرقم 2 موجود في الأبيض والحمراء والسوداء: 3 كريات.
• الرقم 3 موجود في الأبيض والحمراء: كريتان.
المجموع 5 كريات أولية.

عدد الكريات غير الأولية هو 4.

قيم X هي:
0، 1، 2، 3

قانون احتمال X:
• P(X=0)=C(5,0)C(4,3)/C(9,3)=1×4/84=1/21
• P(X=1)=C(5,1)C(4,2)/C(9,3)=5×6/84=5/14
• P(X=2)=C(5,2)C(4,1)/C(9,3)=10×4/84=10/21
• P(X=3)=C(5,3)C(4,0)/C(9,3)=10×1/84=5/42

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=1/21، P(X=1)=5/14، P(X=2)=10/21، P(X=3)=5/42.<br>
تدقيق: 4+30+40+10=84 ✓</p>

2) ب) حساب P(X^2-X<=0):
X^2-X=X(X-1)

بالنسبة لقيم X={0,1,2,3}:
X(X-1)≤0 يتحقق عند X=0 أو X=1.

إذن:
P(X^2-X≤0)=P(X=0)+P(X=1)
=1/21+5/14
=2/42+15/42
=17/42

<p class="property-box"><strong>النتيجة:</strong> P(X²-X≤0)=17/42.</p>`
  },
  {
    id: 28,
    track: "technical",
    year: 2018,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

كيس به 7 كريات متماثلة لا نفرق بينها باللمس، منها 3 بيضاء و4 خضراء.
نسحب عشوائيًا وفي آن واحد كرتين من الكيس.

I)
1) احسب احتمال الحادثة A: سحب كرتين مختلفتين في اللون.
2) احسب احتمال الحادثة B: سحب كرتين من نفس اللون.

II) نقترح اللعبة التالية:
للمشاركة يدفع اللاعب α دينارًا، حيث α عدد طبيعي معطى و DA تعني دينار جزائري.
إذا سحب كرتين بيضاوين يتحصل على 100DA.
وإذا سحب كرتين مختلفتين في اللون يتحصل على 50DA.
وإذا سحب كرتين خضراوين يخسر ما دفعه.

وليكن X المتغير العشوائي الذي يمثل ربح أو خسارة اللاعب بدلالة α.

1) برّر أن قيم المتغير العشوائي X هي: -α ، 50-α ، 100-α، ثم عرّف قانون احتماله.
2) بيّن أن الأمل الرياضي للمتغير العشوائي X بدلالة α هو:
E(X)=-α+300/7.
ثم أوجد أكبر قيمة ممكنة لـ α حتى تكون اللعبة في صالح اللاعب.`,
    solution: `<div class="definition-box"><strong>البيانات:</strong> 7 كريات (3 بيضاء و4 خضراء). نسحب كرتين في آن واحد؛ C(7,2)=21.</div>

I) 1) حساب P(A):
A: سحب كرتين مختلفتين في اللون.
أي كرية بيضاء وكرية خضراء.

عدد الحالات الملائمة:
C(3,1)×C(4,1)=3×4=12

إذن:
P(A)=12/21=4/7

2) حساب P(B):
B: سحب كرتين من نفس اللون.
وهي متممة A، أو نحسب مباشرة.

P(B)=1-P(A)=1-4/7=3/7

وبالحساب المباشر:
P(B)=[C(3,2)+C(4,2)]/C(7,2)
=(3+6)/21=9/21=3/7

II) قانون X:
يدفع اللاعب α في البداية.

• إذا سحب كرتين بيضاوين:
  ربحه الصافي هو 100-α.
  احتماله:
  P(WW)=C(3,2)/C(7,2)=3/21=1/7

• إذا سحب كرتين مختلفتين في اللون:
  ربحه الصافي هو 50-α.
  احتماله:
  P(A)=4/7

• إذا سحب كرتين خضراوين:
  لا يحصل على شيء ويخسر ما دفعه، أي الربح الصافي -α.
  احتماله:
  P(GG)=C(4,2)/C(7,2)=6/21=2/7

إذن قيم X هي:
100-α ، 50-α ، -α

<p class="property-box"><strong>قانون X:</strong><br>
P(X=100-α)=1/7، P(X=50-α)=4/7، P(X=-α)=2/7.<br>
تدقيق: 1+4+2=7 ✓</p>

2) حساب الأمل الرياضي:
E(X)=(100-α)×1/7 + (50-α)×4/7 + (-α)×2/7

=100/7 - α/7 + 200/7 - 4α/7 - 2α/7

=300/7 - 7α/7

=-α + 300/7

<p class="property-box"><strong>التبيان:</strong> E(X)=-α+300/7 ✓</p>

حتى تكون اللعبة في صالح اللاعب يجب أن يكون:
E(X)>0

-α+300/7>0

α<300/7

وبما أن α عدد طبيعي:
300/7≈42.857

لنتحقق:
• عند α=42: E(X)=-42+300/7=(-294+300)/7=6/7>0 → اللعبة في صالح اللاعب.
• عند α=43: E(X)=-43+300/7=(-301+300)/7=-1/7<0 → اللعبة ليست في صالح اللاعب.

<p class="property-box"><strong>النتيجة:</strong> أكبر قيمة ممكنة لـ α هي 42.</p>`
  },
  {
    id: 29,
    track: "management",
    year: 2008,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 7 كرات منها 3 كرات بيضاء تحمل الأرقام 2، 1، 2 و4 كرات حمراء تحمل الأرقام 2، 2، 1، 1. نسحب كرة واحدة من الكيس.

1)
أ) ما احتمال الحصول على كرة تحمل الرقم 1؟
ب) إذا كانت الكرة المسحوبة تحمل الرقم 1، فما احتمال أن يكون لونها أحمر؟

2) نسحب على التوالي كرتين من الكيس دون إرجاع.
أ) ما احتمال الحصول على كرتين تحمل كل منهما رقما فرديا؟
ب) ما احتمال الحصول على كرتين من نفس اللون؟
ج) ما احتمال أن يكون مجموع الرقمين الظاهرين 3؟`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في الكيس 7 كرات: 3 بيضاء أرقامها 2،1،2 و4 حمراء أرقامها 2،2،1،1. إذن عدد الكرات التي تحمل الرقم 1 هو 3، وعدد الكرات التي تحمل الرقم 2 هو 4.</div>

1) نسحب كرة واحدة:

أ) احتمال الحصول على كرة تحمل الرقم 1:
عدد الكرات التي تحمل الرقم 1 هو 3 من أصل 7.

P(1)=3/7

<p class="property-box"><strong>النتيجة:</strong> P(1)=3/7.</p>

ب) إذا علمنا أن الكرة المسحوبة تحمل الرقم 1:
من بين الكرات الثلاث التي تحمل الرقم 1 توجد كرتان حمراوان وواحدة بيضاء.

P(حمراء / تحمل الرقم 1)=2/3

<p class="property-box"><strong>النتيجة:</strong> الاحتمال الشرطي يساوي 2/3.</p>

2) نسحب كرتين على التوالي دون إرجاع:

أ) الحصول على كرتين تحمل كل منهما رقما فرديا:
الأرقام الفردية هنا هي الرقم 1 فقط، وعدد كرات الرقم 1 هو 3.

P = (3/7)×(2/6)=6/42=1/7

<p class="property-box"><strong>النتيجة:</strong> P=1/7.</p>

ب) الحصول على كرتين من نفس اللون:
إما كرتان بيضاوان أو كرتان حمراوان.

P(بيضاوان)=C(3,2)/C(7,2)=3/21
P(حمراوان)=C(4,2)/C(7,2)=6/21

إذن:
P(نفس اللون)=(3+6)/21=9/21=3/7

<p class="property-box"><strong>النتيجة:</strong> P=3/7.</p>

ج) أن يكون مجموع الرقمين الظاهرين 3:
هذا يتحقق بسحب كرة تحمل الرقم 1 وكرة تحمل الرقم 2.
عدد كرات الرقم 1 هو 3، وعدد كرات الرقم 2 هو 4.

عدد الحالات الملائمة:
C(3,1)×C(4,1)=12

عدد الحالات الكلية:
C(7,2)=21

إذن:
P=12/21=4/7

<p class="property-box"><strong>النتيجة:</strong> احتمال أن يكون مجموع الرقمين الظاهرين 3 هو 4/7.</p>`
  },
  {
    id: 30,
    track: "management",
    year: 2008,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 10 قريصات لا يمكن التفريق بينها باللمس، من بينها 6 حمراء اللون تحمل الأرقام 1، 2، 2، 4، 6، 8 والبقية بيضاء اللون تحمل الأرقام 1، 3، 5، 5.

نسحب ثلاث قريصات من هذا الكيس واحدة تلو الأخرى دون إرجاع.

المطلوب حساب:
أ) احتمال الحصول على ثلاث قريصات من نفس اللون.
ب) احتمال الحصول على ثلاث قريصات بألوان مختلفة.
ج) احتمال الحصول على ثلاث قريصات تحمل ثلاثة أرقاما مجموعها 15.
د) احتمال الحصول على ثلاث قريصات مجموعها 15 علما أنها من نفس اللون.`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في الكيس 10 قريصات: 6 حمراء أرقامها 1،2،2،4،6،8 و4 بيضاء أرقامها 1،3،5،5. نسحب 3 قريصات دون إرجاع. عدد الاختيارات الممكنة هو C(10,3)=120.</div>

أ) احتمال الحصول على ثلاث قريصات من نفس اللون:
إما ثلاث حمراء أو ثلاث بيضاء.

P = [C(6,3)+C(4,3)] / C(10,3)
= (20+4)/120
= 24/120
= 1/5

<p class="property-box"><strong>النتيجة:</strong> احتمال الحصول على ثلاث قريصات من نفس اللون هو 1/5.</p>

ب) احتمال الحصول على ثلاث قريصات بألوان مختلفة:
في الكيس لونان فقط: أحمر وأبيض. لذلك يستحيل الحصول على ثلاث قريصات بألوان مختلفة.

<p class="property-box"><strong>النتيجة:</strong> الاحتمال يساوي 0.</p>

ج) احتمال الحصول على ثلاث قريصات تحمل أرقاما مجموعها 15:
نبحث عن ثلاثيات الأرقام الممكنة من القريصات الموجودة ومجموعها 15:

• 1 + 6 + 8 = 15: لدينا قريصتان تحملان 1، وقريصة تحمل 6، وقريصة تحمل 8، إذن 2 حالات.
• 2 + 5 + 8 = 15: لدينا قريصتان تحملان 2، وقريصتان تحملان 5، وقريصة تحمل 8، إذن 2×2×1=4 حالات.
• 3 + 4 + 8 = 15: حالة واحدة.
• 4 + 5 + 6 = 15: لدينا قريصة تحمل 4، وقريصتان تحملان 5، وقريصة تحمل 6، إذن 2 حالات.

عدد الحالات الملائمة:
2+4+1+2=9

إذن:
P = 9 / C(10,3)
= 9/120
= 3/40

<p class="property-box"><strong>النتيجة:</strong> احتمال أن يكون مجموع الأرقام 15 هو 3/40.</p>

د) احتمال الحصول على ثلاث قريصات مجموعها 15 علما أنها من نفس اللون:
نرمز إلى:
A: الحصول على ثلاث قريصات من نفس اللون.
B: الحصول على ثلاث قريصات مجموع أرقامها 15.

نريد حساب P(B/A)=P(A∩B)/P(A).

من بين الثلاثيات ذات نفس اللون ومجموعها 15 توجد حالة واحدة فقط من القريصات الحمراء:
1 + 6 + 8 = 15
أما القريصات البيضاء 1،3،5،5 فلا يمكن اختيار ثلاث منها مجموعها 15.

إذن:
P(A∩B)=1/C(10,3)=1/120

ومنه:
P(B/A) = (1/120) / (1/5)
= 5/120
= 1/24

<p class="property-box"><strong>النتيجة:</strong> الاحتمال الشرطي يساوي 1/24.</p>`
  },
  {
    id: 31,
    track: "management",
    year: 2009,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 9 كريات متماثلة لا نفرق بينها باللمس، منها 4 كريات بيضاء تحمل الأرقام 1، 2، 2، 3 و5 كريات حمراء تحمل الأرقام 1، 2، 2، 3، 3.

نسحب عشوائيا من هذا الكيس كرتين على التوالي مع إرجاع الكرة المسحوبة.

1) شكل شجرة الاحتمالات الموافقة لهذه الوضعية في الحالتين الآتيتين:
• باعتماد ألوان الكرات.
• باعتماد الأرقام المسجلة على الكرات.

2) احسب احتمال كل من الحوادث التالية:
أ) A: الكرتان المسحوبتان بيضاوان.
ب) B: إحدى الكرتين المسحوبتين فقط حمراء.
ج) C: لا يظهر الرقم 1.`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في الكيس 9 كريات: 4 بيضاء و5 حمراء. حسب الأرقام: كرتان تحملان الرقم 1، وأربع كريات تحمل الرقم 2، وثلاث كريات تحمل الرقم 3. السحب يتم مرتين مع الإرجاع، لذلك تبقى الاحتمالات نفسها في السحبة الثانية.</div>

1) شجرة الاحتمالات حسب اللون:
في كل سحبة:
P(بيضاء)=4/9 و P(حمراء)=5/9

إذن فروع الشجرة هي:
• بيضاء ثم بيضاء: (4/9)×(4/9)
• بيضاء ثم حمراء: (4/9)×(5/9)
• حمراء ثم بيضاء: (5/9)×(4/9)
• حمراء ثم حمراء: (5/9)×(5/9)

شجرة الاحتمالات حسب الأرقام:
في كل سحبة:
P(1)=2/9، P(2)=4/9، P(3)=3/9=1/3

ومن كل فرع في السحبة الأولى تتكرر الفروع نفسها في السحبة الثانية لأن السحب مع الإرجاع.

2) حساب الاحتمالات:

أ) A: الكرتان المسحوبتان بيضاوان.

P(A)=P(بيضاء ثم بيضاء)
= (4/9)×(4/9)
= 16/81

<p class="property-box"><strong>النتيجة:</strong> P(A)=16/81.</p>

ب) B: إحدى الكرتين المسحوبتين فقط حمراء.
هذا يعني: حمراء ثم بيضاء أو بيضاء ثم حمراء.

P(B)=P(حمراء ثم بيضاء)+P(بيضاء ثم حمراء)
= (5/9)×(4/9) + (4/9)×(5/9)
= 20/81 + 20/81
= 40/81

<p class="property-box"><strong>النتيجة:</strong> P(B)=40/81.</p>

ج) C: لا يظهر الرقم 1.
عدم ظهور الرقم 1 يعني أن كل كرة مسحوبة تحمل الرقم 2 أو الرقم 3.
عدد الكرات التي لا تحمل الرقم 1 هو 7 من أصل 9.

P(C)=(7/9)×(7/9)
=49/81

<p class="property-box"><strong>النتيجة:</strong> P(C)=49/81.</p>`
  },
  {
    id: 32,
    track: "management",
    year: 2011,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (4.5 نقاط)

يتكون مجتمع من 55% نساء و45% رجال، و25% من النساء يتحدثن لغة أجنبية، و35% من الرجال يتحدثون لغة أجنبية.

نختار عشوائيا شخصا من هذا المجتمع ونعتبر الحوادث التالية:
H: "رجل"
F: "امرأة"
A: "هذا الشخص يتحدث لغة أجنبية"
B: "امرأة تتحدث لغة أجنبية"

1) أكمل شجرة الاحتمالات المقابلة ثم اكتبها.

2) احسب احتمال أن يكون الشخص المختار:
أ) رجلا يتحدث لغة أجنبية.
ب) امرأة لا تتحدث لغة أجنبية.
ج) امرأة تتحدث لغة أجنبية.

3) احسب احتمال أن يكون الشخص المختار رجلا علما أنه يتحدث لغة أجنبية.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 560 310" role="img" aria-label="شجرة احتمالات بكالوريا 2011 تسيير واقتصاد الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2011ManagementTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="155" x2="205" y2="85" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <line x1="45" y1="155" x2="205" y2="225" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <line x1="230" y1="85" x2="415" y2="45" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <line x1="230" y1="85" x2="415" y2="125" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <line x1="230" y1="225" x2="415" y2="185" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <line x1="230" y1="225" x2="415" y2="265" marker-end="url(#bacTreeArrow2011ManagementTopic1)"></line>
        <text x="112" y="103">0.45</text>
        <text x="112" y="231">0.55</text>
        <text x="292" y="53">----</text>
        <text x="292" y="116">0.65</text>
        <text x="292" y="194">----</text>
        <text x="292" y="252">----</text>
        <text x="218" y="78">H</text>
        <text x="218" y="238">F</text>
        <text x="430" y="49">A</text>
        <text x="430" y="129">Ā</text>
        <text x="430" y="189">A</text>
        <text x="430" y="269">B̄</text>
      </svg>
    `,    solution: `<div class="definition-box"><strong>المعطيات:</strong> P(H)=0.45، P(F)=0.55، P(A/H)=0.35، P(A/F)=0.25. إذن P(Ā/H)=0.65 و P(Ā/F)=0.75.</div>

1) شجرة الاحتمالات:

• الفرع الأول: H باحتمال 0.45
  - بعد H: A باحتمال 0.35
  - بعد H: Ā باحتمال 0.65

• الفرع الثاني: F باحتمال 0.55
  - بعد F: A باحتمال 0.25
  - بعد F: Ā باحتمال 0.75

<div class="definition-box"><strong>الشجرة المكتملة:</strong></div>
<svg class="bac-tree" viewBox="0 0 560 310" role="img" aria-label="الشجرة المكتملة لبكالوريا 2011 تسيير واقتصاد الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2011ManagementTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="155" x2="205" y2="85" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <line x1="45" y1="155" x2="205" y2="225" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <line x1="230" y1="85" x2="415" y2="45" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <line x1="230" y1="85" x2="415" y2="125" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <line x1="230" y1="225" x2="415" y2="185" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <line x1="230" y1="225" x2="415" y2="265" marker-end="url(#bacTreeArrow2011ManagementTopic1Solved)"></line>
  <text x="112" y="103">0.45</text>
  <text x="112" y="231">0.55</text>
  <text x="292" y="53">0.35</text>
  <text x="292" y="116">0.65</text>
  <text x="292" y="194">0.25</text>
  <text x="292" y="252">0.75</text>
  <text x="218" y="78">H</text>
  <text x="218" y="238">F</text>
  <text x="430" y="49">A</text>
  <text x="430" y="129">Ā</text>
  <text x="430" y="189">A</text>
  <text x="430" y="269">Ā</text>
</svg>
2) حساب الاحتمالات:

أ) احتمال أن يكون الشخص رجلا ويتحدث لغة أجنبية:
P(H∩A)=P(H)×P(A/H)
=0.45×0.35
=0.1575

<p class="property-box"><strong>النتيجة:</strong> P(H∩A)=0.1575 أي 15.75%.</p>

ب) احتمال أن تكون امرأة لا تتحدث لغة أجنبية:
P(F∩Ā)=P(F)×P(Ā/F)
=0.55×0.75
=0.4125

<p class="property-box"><strong>النتيجة:</strong> P(F∩Ā)=0.4125 أي 41.25%.</p>

ج) احتمال أن تكون امرأة تتحدث لغة أجنبية:
P(B)=P(F∩A)=P(F)×P(A/F)
=0.55×0.25
=0.1375

<p class="property-box"><strong>النتيجة:</strong> P(B)=0.1375 أي 13.75%.</p>

3) احتمال أن يكون الشخص المختار رجلا علما أنه يتحدث لغة أجنبية:
نحسب أولا P(A):

P(A)=P(H∩A)+P(F∩A)
=0.1575+0.1375
=0.295

إذن:
P(H/A)=P(H∩A)/P(A)
=0.1575/0.295
=1575/2950
=63/118
≈0.5339

<p class="property-box"><strong>النتيجة:</strong> P(H/A)=63/118 ≈ 0.534، أي حوالي 53.4%.</p>`
  },
  {
    id: 33,
    track: "management",
    year: 2011,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

عدد تلاميذ ثانوية هو 900، يتوزعون حسب المستوى والصفة (داخلي أو خارجي) كما يلي:

نختار عشوائيا وبطريقة عشوائية بسيطة أحد تلاميذ هذه الثانوية.

1) احسب احتمال أن يكون التلميذ خارجيا.
2) احسب احتمال أن يكون التلميذ من السنة الأولى.
3) احسب احتمال أن يكون التلميذ من السنة الأولى وخارجيا.
4) احسب احتمال أن يكون التلميذ من السنة الأولى علما أنه خارجي.
5) هل الحادثتان: "التلميذ من السنة الأولى" و"التلميذ خارجي" مستقلتان؟`,
    diagram: `
      <table class="bac-data-table" aria-label="توزيع تلاميذ ثانوية حسب المستوى والصفة">
        <thead>
          <tr>
            <th>المستوى<br>الصفة</th>
            <th>السنة الأولى</th>
            <th>السنة الثانية</th>
            <th>السنة الثالثة</th>
            <th>المجموع</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>خارجيون</th>
            <td>150</td>
            <td>200</td>
            <td>250</td>
            <td>600</td>
          </tr>
          <tr>
            <th>داخليون</th>
            <td>80</td>
            <td>120</td>
            <td>100</td>
            <td>300</td>
          </tr>
          <tr>
            <th>المجموع</th>
            <td>230</td>
            <td>320</td>
            <td>350</td>
            <td>900</td>
          </tr>
        </tbody>
      </table>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد التلاميذ الكلي 900. عدد الخارجيين 600، وعدد تلاميذ السنة الأولى 230، وعدد تلاميذ السنة الأولى الخارجيين 150.</div>

نرمز إلى:
E: "التلميذ خارجي"
A: "التلميذ من السنة الأولى"

1) احتمال أن يكون التلميذ خارجيا:
P(E)=600/900=2/3

<p class="property-box"><strong>النتيجة:</strong> P(E)=2/3.</p>

2) احتمال أن يكون التلميذ من السنة الأولى:
عدد تلاميذ السنة الأولى هو:
150+80=230

P(A)=230/900=23/90

<p class="property-box"><strong>النتيجة:</strong> P(A)=23/90.</p>

3) احتمال أن يكون التلميذ من السنة الأولى وخارجيا:
من الجدول عدد تلاميذ السنة الأولى الخارجيين هو 150.

P(A∩E)=150/900=1/6

<p class="property-box"><strong>النتيجة:</strong> P(A∩E)=1/6.</p>

4) احتمال أن يكون التلميذ من السنة الأولى علما أنه خارجي:

P(A/E)=P(A∩E)/P(E)
= (150/900)/(600/900)
=150/600
=1/4

<p class="property-box"><strong>النتيجة:</strong> P(A/E)=1/4.</p>

5) دراسة استقلال الحادثتين A و E:
تكون الحادثتان مستقلتين إذا تحقق:
P(A∩E)=P(A)×P(E)

نحسب:
P(A)×P(E)=(23/90)×(2/3)=46/270=23/135

بينما:
P(A∩E)=1/6

وبما أن:
1/6 ≠ 23/135

فإن الحادثتين غير مستقلتين.

<p class="property-box"><strong>النتيجة:</strong> الحادثتان "التلميذ من السنة الأولى" و"التلميذ خارجي" غير مستقلتين.</p>`
  },
  {
    id: 34,
    track: "management",
    year: 2012,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

وجهت مؤسسة تعليمية دعوات لعدد من التلاميذ للمشاركة في نشاط رياضي. بلغ عدد التلاميذ المشاركين 50 تلميذا، من بينهم 35 ولدا و15 بنتا.

اختار 75% من الأولاد ممارسة كرة القدم، و15% منهم ممارسة كرة اليد، والباقي ممارسة الكرة الطائرة. أما 60% من البنات فاخترن ممارسة الكرة الطائرة، والبقية اخترن ممارسة كرة اليد.

نختار عشوائيا أحد التلاميذ المشاركين، ونعتبر الحوادث التالية:
F: "التلميذ المختار بنت"
T: "التلميذ المختار يمارس كرة القدم"
H: "التلميذ المختار يمارس كرة اليد"
V: "التلميذ المختار يمارس الكرة الطائرة"

1) أنقل الشجرة المقابلة لهذه الوضعية ثم أكملها.
2) احسب P(V) احتمال تحقق الحادثة V.
3) احسب P_F(V).
4) احسب احتمال أن يكون التلميذ المختار لا يمارس كرة القدم.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 620 340" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2012 تسيير واقتصاد الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2012ManagementTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="170" x2="205" y2="95" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="45" y1="170" x2="205" y2="250" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="230" y1="95" x2="420" y2="50" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="230" y1="95" x2="420" y2="95" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="230" y1="95" x2="420" y2="140" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="230" y1="250" x2="420" y2="220" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <line x1="230" y1="250" x2="420" y2="295" marker-end="url(#bacTreeArrow2012ManagementTopic1)"></line>
        <text x="112" y="112">----</text>
        <text x="112" y="250">----</text>
        <text x="300" y="55">75/100</text>
        <text x="300" y="100">----</text>
        <text x="300" y="145">----</text>
        <text x="300" y="225">----</text>
        <text x="300" y="292">60/100</text>
        <text x="218" y="87">F̄</text>
        <text x="218" y="265">F</text>
        <text x="435" y="54">T</text>
        <text x="435" y="99">H</text>
        <text x="435" y="144">V</text>
        <text x="435" y="224">H</text>
        <text x="435" y="299">V</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد التلاميذ 50، منهم 35 ولدا و15 بنتا. نرمز بـ F إلى حادثة "بنت"، إذن P(F)=15/50=3/10 و P(F̄)=35/50=7/10.</div>

1) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 620 340" role="img" aria-label="الشجرة المكتملة لبكالوريا 2012 تسيير واقتصاد الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2012ManagementTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="170" x2="205" y2="95" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="45" y1="170" x2="205" y2="250" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="230" y1="95" x2="420" y2="50" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="230" y1="95" x2="420" y2="95" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="230" y1="95" x2="420" y2="140" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="230" y1="250" x2="420" y2="220" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <line x1="230" y1="250" x2="420" y2="295" marker-end="url(#bacTreeArrow2012ManagementTopic1Solved)"></line>
  <text x="112" y="112">7/10</text>
  <text x="112" y="250">3/10</text>
  <text x="300" y="55">75/100</text>
  <text x="300" y="100">15/100</text>
  <text x="300" y="145">10/100</text>
  <text x="300" y="225">40/100</text>
  <text x="300" y="292">60/100</text>
  <text x="218" y="87">F̄</text>
  <text x="218" y="265">F</text>
  <text x="435" y="54">T</text>
  <text x="435" y="99">H</text>
  <text x="435" y="144">V</text>
  <text x="435" y="224">H</text>
  <text x="435" y="299">V</text>
</svg>

2) حساب P(V):

P(V)=P(F̄∩V)+P(F∩V)
=P(F̄)×P(V/F̄)+P(F)×P(V/F)
=(7/10)×(10/100)+(3/10)×(60/100)
=7/100+18/100
=25/100=1/4

<p class="property-box"><strong>النتيجة:</strong> P(V)=1/4.</p>

3) حساب P_F(V):
من الشجرة مباشرة:

P_F(V)=P(V/F)=60/100=3/5

<p class="property-box"><strong>النتيجة:</strong> P_F(V)=3/5.</p>

4) احتمال أن يكون التلميذ المختار لا يمارس كرة القدم:
كرة القدم تظهر فقط عند فرع الأولاد في هذه الشجرة، لذلك:

P(T)=P(F̄)×P(T/F̄)
=(7/10)×(75/100)
=525/1000=21/40

إذن:
P(T̄)=1-P(T)
=1-21/40
=19/40

<p class="property-box"><strong>النتيجة:</strong> احتمال ألا يمارس التلميذ المختار كرة القدم هو 19/40.</p>`
  },
  {
    id: 35,
    track: "management",
    year: 2012,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

بينت دراسة إحصائية لتلاميذ السنة الثالثة ثانوي بإحدى الثانويات أن 30% من التلاميذ قدموا من الإكمالية A، و45% قدموا من الإكمالية B، والبقية قدموا من الإكمالية C.

في السنة الأولى نجح 25% من التلاميذ القادمين من الإكمالية A، و18% من الذين قدموا من الإكمالية B، و84% من الذين قدموا من الإكمالية C.

نختار تلميذا من تلاميذ السنة الثالثة ثانوي بطريقة عشوائية، وبعد اجتيازه امتحان البكالوريا نرمز إلى:
R: "التلميذ المختار نجح في الامتحان"
A: "التلميذ المختار قادم من الإكمالية A"
B: "التلميذ المختار قادم من الإكمالية B"
C: "التلميذ المختار قادم من الإكمالية C"

1) أنجز شجرة الاحتمالات التي تمثل هذه الوضعية.
2) احسب P(C∩R) ثم تحقق أن P(C∩R)=0.21.
3) احسب احتمال P(R).
4) احسب الاحتمال الشرطي P_R(B).`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> P(A)=0.30، P(B)=0.45، P(C)=0.25. كما أن P(R/A)=0.25، P(R/B)=0.18، P(R/C)=0.84.</div>

1) شجرة الاحتمالات:

<svg class="bac-tree" viewBox="0 0 680 430" role="img" aria-label="شجرة احتمالات بكالوريا 2012 تسيير واقتصاد الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2012ManagementTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="215" x2="205" y2="85" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="45" y1="215" x2="205" y2="215" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="45" y1="215" x2="205" y2="345" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="85" x2="445" y2="55" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="85" x2="445" y2="115" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="215" x2="445" y2="185" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="215" x2="445" y2="245" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="345" x2="445" y2="315" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <line x1="230" y1="345" x2="445" y2="375" marker-end="url(#bacTreeArrow2012ManagementTopic2)"></line>
  <text x="110" y="118">0.30</text>
  <text x="110" y="205">0.45</text>
  <text x="110" y="328">0.25</text>
  <text x="315" y="58">0.25</text>
  <text x="315" y="122">0.75</text>
  <text x="315" y="188">0.18</text>
  <text x="315" y="252">0.82</text>
  <text x="315" y="318">0.84</text>
  <text x="315" y="382">0.16</text>
  <text x="218" y="78">A</text>
  <text x="218" y="228">B</text>
  <text x="218" y="358">C</text>
  <text x="462" y="59">R</text>
  <text x="462" y="119">R̄</text>
  <text x="462" y="189">R</text>
  <text x="462" y="249">R̄</text>
  <text x="462" y="319">R</text>
  <text x="462" y="379">R̄</text>
</svg>

2) حساب P(C∩R):

P(C∩R)=P(C)×P(R/C)
=0.25×0.84
=0.21

<p class="property-box"><strong>تأكيد:</strong> P(C∩R)=0.21.</p>

3) حساب P(R):

P(R)=P(A∩R)+P(B∩R)+P(C∩R)
=P(A)P(R/A)+P(B)P(R/B)+P(C)P(R/C)
=0.30×0.25 + 0.45×0.18 + 0.25×0.84
=0.075+0.081+0.21
=0.366

<p class="property-box"><strong>النتيجة:</strong> P(R)=0.366.</p>

4) حساب الاحتمال الشرطي P_R(B):

P_R(B)=P(B/R)=P(B∩R)/P(R)

P(B∩R)=P(B)×P(R/B)
=0.45×0.18
=0.081

إذن:
P_R(B)=0.081/0.366
=81/366
=27/122
≈0.221

<p class="property-box"><strong>النتيجة:</strong> P_R(B)=27/122≈0.221.</p>`
  },
  {
    id: 36,
    track: "management",
    year: 2013,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

في رف من رفوف مكتبة "ثانوية النجاح"، يوجد 150 كتاب رياضيات و50 كتاب فلسفة، حيث 40% من كتب الرياضيات و70% من كتب الفلسفة تخص شعبة التسيير والاقتصاد.

نختار عشوائيا من الرف كتابا واحدا.

عين، مع التبرير، الجواب الصحيح الوحيد من بين الأجوبة المقترحة، في كل حالة من الحالات التالية:

1) احتمال أن يكون الكتاب المختار كتاب رياضيات هو:
أ) 3/4      ب) 2/5      ج) 1/150

2) احتمال أن يكون الكتاب المختار خاصا بشعبة التسيير والاقتصاد هو:
أ) 0.24      ب) 0.475      ج) 0.21

3) احتمال أن يكون الكتاب المختار كتاب رياضيات خاصا بشعبة التسيير والاقتصاد هو:
أ) 0.15      ب) 0.4      ج) 0.3

4) إذا كان الكتاب المختار يخص شعبة التسيير والاقتصاد، فإن احتمال أن يكون كتاب رياضيات هو:
أ) 2/75      ب) 12/19      ج) 3/10`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد الكتب الكلي هو 150+50=200. كتب الرياضيات 150 وكتب الفلسفة 50. من كتب الرياضيات: 40% تخص التسيير والاقتصاد، أي 0.40×150=60 كتابا. ومن كتب الفلسفة: 70% تخص التسيير والاقتصاد، أي 0.70×50=35 كتابا.</div>

إذن عدد الكتب الخاصة بشعبة التسيير والاقتصاد هو:
60+35=95

1) احتمال أن يكون الكتاب المختار كتاب رياضيات:

P(رياضيات)=150/200=3/4

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) 3/4.</p>

2) احتمال أن يكون الكتاب المختار خاصا بشعبة التسيير والاقتصاد:

P(تسيير واقتصاد)=95/200=0.475

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ب) 0.475.</p>

3) احتمال أن يكون الكتاب المختار كتاب رياضيات خاصا بشعبة التسيير والاقتصاد:
عدد كتب الرياضيات الخاصة بالتسيير والاقتصاد هو 60.

P=60/200=0.3

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ج) 0.3.</p>

4) إذا كان الكتاب المختار يخص شعبة التسيير والاقتصاد، فإن احتمال أن يكون كتاب رياضيات هو:

P(رياضيات / تسيير واقتصاد)=60/95=12/19

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ب) 12/19.</p>`
  },
  {
    id: 37,
    track: "management",
    year: 2013,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

وضعت أسئلة امتحان شفوي في علبتين متماثلتين A وB. العلبة A تحتوي على 4 أسئلة في الثقافة العامة و6 أسئلة في مادة الاختصاص، والعلبة B تحتوي على 3 أسئلة في الثقافة العامة و7 أسئلة في مادة الاختصاص. عمليتا سحب الأسئلة واختيار إحدى العلبتين متساوية الاحتمال.

1) يختار مترشح إحدى العلبتين ليسحب منها عشوائيا سؤالا واحدا.
أ) شكل شجرة الاحتمالات المتوازنة.
ب) ما هو احتمال سحب المترشح لسؤال في مادة الاختصاص من العلبة A؟
ج) ما هو احتمال سحب المترشح لسؤال في مادة الاختصاص من العلبة B؟
د) ما هو احتمال سحب المترشح لسؤال في مادة الاختصاص؟
هـ) علما أن المترشح سحب سؤالا في الثقافة العامة، ما احتمال أن يكون من العلبة B؟

2) مترشح آخر يسحب عشوائيا سؤالا واحدا من العلبة A وسؤالا واحدا من العلبة B. بين أن احتمال سحب سؤالين في مادة الاختصاص هو 0.42.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 650 330" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2013 تسيير واقتصاد الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2013ManagementTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2013ManagementTopic2)"></line>
        <text x="118" y="103">1/2</text>
        <text x="118" y="235">1/2</text>
        <text x="320" y="58">----</text>
        <text x="320" y="130">----</text>
        <text x="320" y="208">----</text>
        <text x="320" y="280">----</text>
        <text x="228" y="84">A</text>
        <text x="228" y="255">B</text>
        <text x="462" y="59">G</text>
        <text x="462" y="129">S</text>
        <text x="462" y="209">G</text>
        <text x="462" y="279">S</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>الرموز:</strong> نرمز بـ G إلى "سؤال في الثقافة العامة"، وبـ S إلى "سؤال في مادة الاختصاص". اختيار العلبة A أو B متساوي الاحتمال، إذن P(A)=P(B)=1/2.</div>

1) أ) شجرة الاحتمالات المتوازنة:

<svg class="bac-tree" viewBox="0 0 650 330" role="img" aria-label="الشجرة المكتملة لبكالوريا 2013 تسيير واقتصاد الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2013ManagementTopic2Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2013ManagementTopic2Solved)"></line>
  <text x="118" y="103">1/2</text>
  <text x="118" y="235">1/2</text>
  <text x="320" y="58">4/10</text>
  <text x="320" y="130">6/10</text>
  <text x="320" y="208">3/10</text>
  <text x="320" y="280">7/10</text>
  <text x="228" y="84">A</text>
  <text x="228" y="255">B</text>
  <text x="462" y="59">G</text>
  <text x="462" y="129">S</text>
  <text x="462" y="209">G</text>
  <text x="462" y="279">S</text>
</svg>

ب) احتمال سحب سؤال في مادة الاختصاص من العلبة A:

P(A∩S)=P(A)×P(S/A)
=1/2×6/10
=3/10
=0.3

<p class="property-box"><strong>النتيجة:</strong> P(A∩S)=0.3.</p>

ج) احتمال سحب سؤال في مادة الاختصاص من العلبة B:

P(B∩S)=P(B)×P(S/B)
=1/2×7/10
=7/20
=0.35

<p class="property-box"><strong>النتيجة:</strong> P(B∩S)=0.35.</p>

د) احتمال سحب سؤال في مادة الاختصاص:

P(S)=P(A∩S)+P(B∩S)
=0.3+0.35
=0.65

<p class="property-box"><strong>النتيجة:</strong> P(S)=0.65.</p>

هـ) علما أن المترشح سحب سؤالا في الثقافة العامة، احتمال أن يكون من العلبة B:

P(G)=P(A∩G)+P(B∩G)
=1/2×4/10 + 1/2×3/10
=2/10+3/20
=7/20

P(B/G)=P(B∩G)/P(G)
=(1/2×3/10)/(7/20)
=(3/20)/(7/20)
=3/7

<p class="property-box"><strong>النتيجة:</strong> P(B/G)=3/7.</p>

2) يسحب مترشح سؤالا من A وسؤالا من B:
احتمال أن يكون السؤالان في مادة الاختصاص هو:

P(S من A و S من B)=P(S/A)×P(S/B)
=6/10×7/10
=42/100
=0.42

<p class="property-box"><strong>تبيان:</strong> احتمال سحب سؤالين في مادة الاختصاص هو 0.42.</p>`
  },
  {
    id: 38,
    track: "management",
    year: 2014,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

ثلاثة أكياس متماثلة U1 وU2 وU3، كل منها يحوي 6 كريات متماثلة.
الكيس U1 يحوي كريتين بيضاوين وأربع كريات حمراء.
الكيس U2 يحوي ثلاث كريات بيضاء وثلاث كريات حمراء.
الكيس U3 يحوي خمس كريات بيضاء وكرية حمراء.

نختار عشوائيا كيسا ثم نسحب منه دون اختيار كرية واحدة.

1) شكل شجرة الاحتمالات المتوازنة التي تنمذج هذه الوضعية.
2) ما احتمال سحب كرية بيضاء من الكيس U3؟
3) ما احتمال سحب كرية بيضاء؟
4) علما أن الكرية المسحوبة بيضاء، ما احتمال أن تكون من الكيس U3؟`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 690 430" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2014 تسيير واقتصاد الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2014ManagementTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="215" x2="205" y2="85" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="45" y1="215" x2="205" y2="215" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="45" y1="215" x2="205" y2="345" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="85" x2="455" y2="55" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="85" x2="455" y2="115" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="215" x2="455" y2="185" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="215" x2="455" y2="245" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="345" x2="455" y2="315" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <line x1="235" y1="345" x2="455" y2="375" marker-end="url(#bacTreeArrow2014ManagementTopic1)"></line>
        <text x="112" y="118">1/3</text>
        <text x="112" y="205">1/3</text>
        <text x="112" y="328">1/3</text>
        <text x="318" y="58">----</text>
        <text x="318" y="122">----</text>
        <text x="318" y="188">----</text>
        <text x="318" y="252">----</text>
        <text x="318" y="318">----</text>
        <text x="318" y="382">----</text>
        <text x="218" y="78">U1</text>
        <text x="218" y="228">U2</text>
        <text x="218" y="358">U3</text>
        <text x="472" y="59">B</text>
        <text x="472" y="119">R</text>
        <text x="472" y="189">B</text>
        <text x="472" y="249">R</text>
        <text x="472" y="319">B</text>
        <text x="472" y="379">R</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> نختار أحد الأكياس الثلاثة باحتمال 1/3 لكل كيس. نرمز بـ B إلى "كرية بيضاء" وR إلى "كرية حمراء".</div>

1) شجرة الاحتمالات المتوازنة:

<svg class="bac-tree" viewBox="0 0 690 430" role="img" aria-label="الشجرة المكتملة لبكالوريا 2014 تسيير واقتصاد الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2014ManagementTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="215" x2="205" y2="85" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="45" y1="215" x2="205" y2="215" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="45" y1="215" x2="205" y2="345" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="85" x2="455" y2="55" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="85" x2="455" y2="115" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="215" x2="455" y2="185" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="215" x2="455" y2="245" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="345" x2="455" y2="315" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <line x1="235" y1="345" x2="455" y2="375" marker-end="url(#bacTreeArrow2014ManagementTopic1Solved)"></line>
  <text x="112" y="118">1/3</text>
  <text x="112" y="205">1/3</text>
  <text x="112" y="328">1/3</text>
  <text x="318" y="58">2/6</text>
  <text x="318" y="122">4/6</text>
  <text x="318" y="188">3/6</text>
  <text x="318" y="252">3/6</text>
  <text x="318" y="318">5/6</text>
  <text x="318" y="382">1/6</text>
  <text x="218" y="78">U1</text>
  <text x="218" y="228">U2</text>
  <text x="218" y="358">U3</text>
  <text x="472" y="59">B</text>
  <text x="472" y="119">R</text>
  <text x="472" y="189">B</text>
  <text x="472" y="249">R</text>
  <text x="472" y="319">B</text>
  <text x="472" y="379">R</text>
</svg>

2) احتمال سحب كرية بيضاء من الكيس U3:

P(U3∩B)=P(U3)×P(B/U3)
=1/3×5/6
=5/18

<p class="property-box"><strong>النتيجة:</strong> P(U3∩B)=5/18.</p>

3) احتمال سحب كرية بيضاء:

P(B)=P(U1∩B)+P(U2∩B)+P(U3∩B)
=1/3×2/6 + 1/3×3/6 + 1/3×5/6
=2/18+3/18+5/18
=10/18=5/9

<p class="property-box"><strong>النتيجة:</strong> P(B)=5/9.</p>

4) علما أن الكرية المسحوبة بيضاء، احتمال أن تكون من الكيس U3:

P(U3/B)=P(U3∩B)/P(B)
=(5/18)/(5/9)
=5/18×9/5
=1/2

<p class="property-box"><strong>النتيجة:</strong> P(U3/B)=1/2.</p>`
  },
  {
    id: 39,
    track: "management",
    year: 2014,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

عين مع التبرير الجواب الصحيح الوحيد من بين الأجوبة الثلاثة المقترحة في كل حالة من الحالات الآتية:

I) أعضاء الطاقم الصحي لمؤسسة استشفائية موزعون حسب الجدول المقابل. نختار عشوائيا عضوا من هذا الطاقم.

1) احتمال أن يكون العضو المختار أنثى هو:
أ) 1/23      ب) 23/60      ج) 8/23

2) احتمال أن يكون العضو المختار أنثى علما أنها طبيبة هو:
أ) 2/5      ب) 2/15      ج) 8/23

II) الجدول المقابل يعرف قانون احتمال تجربة عشوائية.

1) تباين قانون الاحتمال هو:
أ) 1.12      ب) 2.5      ج) 1.25

2) إذا كانت A وB حادثتين مستقلتين، حيث P(A)=0.4 وP(B)=0.3، فإن P(A∩B) هو:
أ) 0.12      ب) 0.7      ج) 0.75`,
    diagram: `
      <table class="bac-data-table" aria-label="توزيع أعضاء الطاقم الصحي حسب الجنس والوظيفة">
        <thead>
          <tr>
            <th></th>
            <th>ممرضون</th>
            <th>أطباء</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>ذكور</th>
            <td>25</td>
            <td>12</td>
          </tr>
          <tr>
            <th>إناث</th>
            <td>15</td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
      <table class="bac-data-table" aria-label="قانون احتمال تجربة عشوائية">
        <thead>
          <tr>
            <th>xᵢ</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>pᵢ</th>
            <td>0.2</td>
            <td>0.4</td>
            <td>0.1</td>
            <td>0.3</td>
          </tr>
        </tbody>
      </table>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد أعضاء الطاقم هو 25+12+15+8=60. عدد الإناث هو 15+8=23. عدد الأطباء هو 12+8=20، ومنهم 8 إناث.</div>

I) 1) احتمال أن يكون العضو المختار أنثى:

P(أنثى)=23/60

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ب) 23/60.</p>

I) 2) احتمال أن يكون العضو المختار أنثى علما أنها طبيبة:

P(أنثى / طبيب)=عدد الطبيبات / عدد الأطباء
=8/20
=2/5

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) 2/5.</p>

II) 1) حساب تباين قانون الاحتمال:

E(X)=1×0.2 + 2×0.4 + 3×0.1 + 4×0.3
=0.2+0.8+0.3+1.2
=2.5

E(X²)=1²×0.2 + 2²×0.4 + 3²×0.1 + 4²×0.3
=0.2+1.6+0.9+4.8
=7.5

V(X)=E(X²)-[E(X)]²
=7.5-(2.5)²
=7.5-6.25
=1.25

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ج) 1.25.</p>

II) 2) إذا كانت A وB مستقلتين:

P(A∩B)=P(A)×P(B)
=0.4×0.3
=0.12

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) 0.12.</p>`
  },
  {
    id: 40,
    track: "management",
    year: 2015,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

اختر الاقتراح الصحيح الوحيد من بين الاقتراحات الثلاثة مع التبرير في كل حالة من الحالات الآتية:

1) نعتبر المتتالية (uₙ) المعرفة من أجل كل عدد طبيعي n بحدها العام:
uₙ = 5×2ⁿ×3ⁿ⁻¹
المتتالية (uₙ):
أ) هندسية      ب) حسابية      ج) ليست هندسية ولا حسابية

2) (vₙ) متتالية حسابية حدها الأول v₀=1 وأساسها 4. قيمة n التي من أجلها يكون:
v₁+v₂+...+vₙ=2015
هي:
أ) n=31      ب) n=32      ج) n=33

3) منحنى الدالة f المعرفة على R بـ f(x)=(x²-1)³ يقبل مماسا في النقطة ذات الفاصلة √2 معادلته:
أ) y=√2x+1      ب) y=6√2x-11      ج) y=6√2x+1

4) A وB حادثتان من مجموعة إمكانيات، حيث P(A)=0.3 و P_A(B)=0.4. فإن:
أ) P(A∩B)=0.12      ب) P(A∩B)=0.1      ج) P(A∩B)=0.7

5) A وB حادثتان مستقلتان من مجموعة إمكانيات، حيث P(A)=0.3 و P(B)=0.4. فإن:
أ) P(A∪B)=0.7      ب) P(A∪B)=0.58      ج) P(A∪B)=0.12

6) A وB حادثتان من مجموعة إمكانيات، حيث P(A)=0.3 و P_A(B)=0.4 و P(A∪B)=0.68. فإن:
أ) P(B)=0.204      ب) P(B)=0.272      ج) P(B)=0.5`,
    solution: `<div class="definition-box"><strong>فكرة الحل:</strong> نبرر كل اختيار بحساب مباشر أو باستعمال العلاقة المناسبة.</div>

1) لدينا:

uₙ = 5×2ⁿ×3ⁿ⁻¹
= (5/3)×2ⁿ×3ⁿ
= (5/3)×6ⁿ

إذن المتتالية هندسية أساسها 6.

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) هندسية.</p>

2) بما أن v₀=1 وأساس المتتالية الحسابية هو 4، فإن:

vₙ=1+4n

إذن:
v₁=5 و vₙ=1+4n

مجموع الحدود من v₁ إلى vₙ هو:
S = n(v₁+vₙ)/2
= n(5+1+4n)/2
= n(4n+6)/2
= n(2n+3)

نحل:
n(2n+3)=2015

بتجريب الاختيارات:
لـ n=31 نجد 31×65=2015.

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) n=31.</p>

3) f(x)=(x²-1)³

f'(x)=3(x²-1)²×2x
=6x(x²-1)²

عند x=√2:
f(√2)=(2-1)³=1
f'(√2)=6√2(2-1)²=6√2

معادلة المماس:
y=f'(√2)(x-√2)+f(√2)
=6√2(x-√2)+1
=6√2x-12+1
=6√2x-11

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ب) y=6√2x-11.</p>

4) حسب تعريف الاحتمال الشرطي:

P_A(B)=P(A∩B)/P(A)

إذن:
P(A∩B)=P(A)×P_A(B)
=0.3×0.4
=0.12

<p class="property-box"><strong>الإجابة الصحيحة:</strong> أ) P(A∩B)=0.12.</p>

5) بما أن A وB مستقلتان:

P(A∩B)=P(A)×P(B)=0.3×0.4=0.12

إذن:
P(A∪B)=P(A)+P(B)-P(A∩B)
=0.3+0.4-0.12
=0.58

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ب) P(A∪B)=0.58.</p>

6) أولا:
P(A∩B)=P(A)×P_A(B)
=0.3×0.4
=0.12

ومن علاقة الاتحاد:
P(A∪B)=P(A)+P(B)-P(A∩B)

0.68=0.3+P(B)-0.12

P(B)=0.68-0.18
=0.5

<p class="property-box"><strong>الإجابة الصحيحة:</strong> ج) P(B)=0.5.</p>`
  },
  {
    id: 41,
    track: "management",
    year: 2015,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

مصنع سيارات يشتغل بوحدتين A وB وينتج نوعين: سيارات تسير بالبنزين نرمز إليها بـ E، وأخرى بغير البنزين نرمز إليها بـ Ē.

ربع إنتاج هذا المصنع تصنعه الوحدة A.

اشترى شخص سيارة من إنتاج هذا المصنع. احتمال أن تكون هذه السيارة من صنع الوحدة A وتسير بالبنزين يساوي 1/6، واحتمال أن تكون من صنع الوحدة B وتسير بالبنزين يساوي 3/8.

تعطى كل النتائج على شكل كسر غير قابل للاختزال.

1) بين أن احتمال أن تكون السيارة تسير بالبنزين علما أنها من صنع الوحدة A يساوي 2/3.
2) احسب احتمال أن تكون السيارة تسير بالبنزين علما أنها من صنع الوحدة B.
3) أ) احسب احتمال أن تكون السيارة تسير بالبنزين.
   ب) علما أن السيارة تسير بالبنزين، ما احتمال أن تكون من صنع الوحدة A؟
4) أنجز شجرة الاحتمالات التي تمثل هذه الوضعية.`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> P(A)=1/4، إذن P(B)=3/4. كما أن P(A∩E)=1/6 و P(B∩E)=3/8.</div>

1) حساب P_A(E):

P_A(E)=P(E/A)=P(A∩E)/P(A)
=(1/6)/(1/4)
=1/6×4
=4/6=2/3

<p class="property-box"><strong>تبيان:</strong> P_A(E)=2/3.</p>

2) حساب P_B(E):

P_B(E)=P(E/B)=P(B∩E)/P(B)
=(3/8)/(3/4)
=3/8×4/3
=1/2

<p class="property-box"><strong>النتيجة:</strong> P_B(E)=1/2.</p>

3) أ) احتمال أن تكون السيارة تسير بالبنزين:

P(E)=P(A∩E)+P(B∩E)
=1/6+3/8
=4/24+9/24
=13/24

<p class="property-box"><strong>النتيجة:</strong> P(E)=13/24.</p>

ب) احتمال أن تكون السيارة من صنع الوحدة A علما أنها تسير بالبنزين:

P(A/E)=P(A∩E)/P(E)
=(1/6)/(13/24)
=1/6×24/13
=4/13

<p class="property-box"><strong>النتيجة:</strong> P(A/E)=4/13.</p>

4) شجرة الاحتمالات:

<svg class="bac-tree" viewBox="0 0 640 330" role="img" aria-label="شجرة احتمالات بكالوريا 2015 تسيير واقتصاد الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2015ManagementTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2015ManagementTopic2)"></line>
  <text x="118" y="103">1/4</text>
  <text x="118" y="235">3/4</text>
  <text x="320" y="58">2/3</text>
  <text x="320" y="130">1/3</text>
  <text x="320" y="208">1/2</text>
  <text x="320" y="280">1/2</text>
  <text x="228" y="84">A</text>
  <text x="228" y="255">B</text>
  <text x="462" y="59">E</text>
  <text x="462" y="129">Ē</text>
  <text x="462" y="209">E</text>
  <text x="462" y="279">Ē</text>
</svg>`
  },
  {
    id: 42,
    track: "management",
    year: 2016,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

الجدول التالي يعطي توزيع 500 تلميذ في إحدى الثانويات.

نختار عشوائيا تلميذا من الثانوية ونسمي H الحادثة: "التلميذ المختار ذكر"، وF الحادثة: "التلميذ المختار أنثى"، وS الحادثة: "التلميذ يملك هاتفا نقالا"، وS̄ الحادثة: "التلميذ لا يملك هاتفا نقالا".

1) شكل شجرة الاحتمالات لهذه التجربة.
2) احسب احتمال الحوادث التالية:
أ) التلميذ المختار أنثى وتملك هاتفا نقالا.
ب) التلميذ المختار لا يملك هاتفا نقالا.
3) نفرض أن التلميذ المختار لا يملك هاتفا نقالا. ما هو احتمال أن يكون هذا التلميذ ذكرا؟`,
    diagram: `
      <table class="bac-data-table" aria-label="توزيع التلاميذ حسب الجنس وامتلاك الهاتف النقال">
        <thead>
          <tr>
            <th>التلميذ</th>
            <th>ذكور</th>
            <th>إناث</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>يملك هاتف نقال</th>
            <td>60</td>
            <td>240</td>
          </tr>
          <tr>
            <th>لا يملك هاتف نقال</th>
            <td>120</td>
            <td>80</td>
          </tr>
        </tbody>
      </table>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد التلاميذ الكلي 500. عدد الذكور 60+120=180، وعدد الإناث 240+80=320. إذن P(H)=180/500=9/25 و P(F)=320/500=16/25.</div>

1) شجرة الاحتمالات:

<svg class="bac-tree" viewBox="0 0 640 330" role="img" aria-label="شجرة احتمالات بكالوريا 2016 تسيير واقتصاد الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2016ManagementTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2016ManagementTopic1)"></line>
  <text x="118" y="103">9/25</text>
  <text x="118" y="235">16/25</text>
  <text x="320" y="58">1/3</text>
  <text x="320" y="130">2/3</text>
  <text x="320" y="208">3/4</text>
  <text x="320" y="280">1/4</text>
  <text x="228" y="84">H</text>
  <text x="228" y="255">F</text>
  <text x="462" y="59">S</text>
  <text x="462" y="129">S̄</text>
  <text x="462" y="209">S</text>
  <text x="462" y="279">S̄</text>
</svg>

لأن:
P(S/H)=60/180=1/3، P(S̄/H)=120/180=2/3
P(S/F)=240/320=3/4، P(S̄/F)=80/320=1/4

2) أ) احتمال أن يكون التلميذ المختار أنثى وتملك هاتفا نقالا:

P(F∩S)=240/500=12/25

أو من الشجرة:
P(F∩S)=P(F)×P(S/F)=16/25×3/4=12/25

<p class="property-box"><strong>النتيجة:</strong> P(F∩S)=12/25.</p>

ب) احتمال أن يكون التلميذ المختار لا يملك هاتفا نقالا:

عدد الذين لا يملكون هاتفا نقالا هو 120+80=200.

P(S̄)=200/500=2/5

<p class="property-box"><strong>النتيجة:</strong> P(S̄)=2/5.</p>

3) علما أن التلميذ المختار لا يملك هاتفا نقالا، احتمال أن يكون ذكرا:

P(H/S̄)=P(H∩S̄)/P(S̄)

P(H∩S̄)=120/500
و P(S̄)=200/500

إذن:
P(H/S̄)=120/200=3/5

<p class="property-box"><strong>النتيجة:</strong> الاحتمال هو 3/5.</p>`
  },
  {
    id: 43,
    track: "management",
    year: 2016,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

وكالة أسفار تقترح على زبائنها ثلاث وجهات A وB وC.
20% من الزبائن اختاروا الوجهة A، و50% اختاروا الوجهة B، والباقي اختار الوجهة C.

عند العودة من السفر أجرت الوكالة استجوابا لزبائنها حول مدى إعجابهم بالوجهة، واستنتجت ما يلي:
50% من أصحاب الوجهة A كانوا معجبين بها.
30% من أصحاب الوجهة B كانوا غير معجبين بها.
80% من أصحاب الوجهة C كانوا معجبين بها.

نختار عشوائيا أحد الزبائن ونسجل الحادثتين التاليتين:
S: "الزبون معجب بالوجهة المختارة"
S̄: "الزبون غير معجب بالوجهة المختارة"

1) انقل شجرة الاحتمالات المقابلة ثم أكمل القيم الناقصة.
2) أ) احسب احتمالات الحوادث الآتية: A∩S̄ ، B∩S̄ ، C∩S.
   ب) استنتج احتمال أن يكون الزبون معجبا بالوجهة المختارة.
3) استجوبنا زبونا غير معجب بالوجهة المختارة، ما احتمال أن يكون من أصحاب الوجهة B؟`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 700 430" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2016 تسيير واقتصاد الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2016ManagementTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="215" x2="215" y2="85" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="45" y1="215" x2="215" y2="215" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="45" y1="215" x2="215" y2="345" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="85" x2="455" y2="55" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="85" x2="455" y2="115" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="215" x2="455" y2="185" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="215" x2="455" y2="245" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="345" x2="455" y2="315" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <line x1="240" y1="345" x2="455" y2="375" marker-end="url(#bacTreeArrow2016ManagementTopic2)"></line>
        <text x="112" y="118">0.2</text>
        <text x="112" y="205">0.5</text>
        <text x="112" y="328">----</text>
        <text x="318" y="58">0.5</text>
        <text x="318" y="122">----</text>
        <text x="318" y="188">----</text>
        <text x="318" y="252">0.3</text>
        <text x="318" y="318">0.8</text>
        <text x="318" y="382">----</text>
        <text x="228" y="78">A</text>
        <text x="228" y="228">B</text>
        <text x="228" y="358">C</text>
        <text x="472" y="59">S</text>
        <text x="472" y="119">S̄</text>
        <text x="472" y="189">S</text>
        <text x="472" y="249">S̄</text>
        <text x="472" y="319">S</text>
        <text x="472" y="379">S̄</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> P(A)=0.2، P(B)=0.5، إذن P(C)=0.3. كما أن P(S/A)=0.5، P(S̄/B)=0.3، P(S/C)=0.8.</div>

1) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 700 430" role="img" aria-label="الشجرة المكتملة لبكالوريا 2016 تسيير واقتصاد الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2016ManagementTopic2Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="215" x2="215" y2="85" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="45" y1="215" x2="215" y2="215" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="45" y1="215" x2="215" y2="345" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="85" x2="455" y2="55" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="85" x2="455" y2="115" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="215" x2="455" y2="185" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="215" x2="455" y2="245" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="345" x2="455" y2="315" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <line x1="240" y1="345" x2="455" y2="375" marker-end="url(#bacTreeArrow2016ManagementTopic2Solved)"></line>
  <text x="112" y="118">0.2</text>
  <text x="112" y="205">0.5</text>
  <text x="112" y="328">0.3</text>
  <text x="318" y="58">0.5</text>
  <text x="318" y="122">0.5</text>
  <text x="318" y="188">0.7</text>
  <text x="318" y="252">0.3</text>
  <text x="318" y="318">0.8</text>
  <text x="318" y="382">0.2</text>
  <text x="228" y="78">A</text>
  <text x="228" y="228">B</text>
  <text x="228" y="358">C</text>
  <text x="472" y="59">S</text>
  <text x="472" y="119">S̄</text>
  <text x="472" y="189">S</text>
  <text x="472" y="249">S̄</text>
  <text x="472" y="319">S</text>
  <text x="472" y="379">S̄</text>
</svg>

2) أ) حساب الاحتمالات:

P(A∩S̄)=P(A)×P(S̄/A)
=0.2×0.5
=0.10

P(B∩S̄)=P(B)×P(S̄/B)
=0.5×0.3
=0.15

P(C∩S)=P(C)×P(S/C)
=0.3×0.8
=0.24

<p class="property-box"><strong>النتائج:</strong> P(A∩S̄)=0.10، P(B∩S̄)=0.15، P(C∩S)=0.24.</p>

ب) احتمال أن يكون الزبون معجبا بالوجهة المختارة:

P(S)=P(A∩S)+P(B∩S)+P(C∩S)
=0.2×0.5 + 0.5×0.7 + 0.3×0.8
=0.10+0.35+0.24
=0.69

<p class="property-box"><strong>النتيجة:</strong> P(S)=0.69.</p>

3) احتمال أن يكون الزبون من أصحاب الوجهة B علما أنه غير معجب:

نحسب أولا P(S̄):
P(S̄)=1-P(S)=1-0.69=0.31

P(B/S̄)=P(B∩S̄)/P(S̄)
=0.15/0.31
=15/31

<p class="property-box"><strong>النتيجة:</strong> P(B/S̄)=15/31≈0.484.</p>`
  },
  {
    id: 44,
    track: "experimental",
    year: 2025,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق U1 على 5 كريات منها: كريتان حمراوان وثلاث كريات خضراء، ويحتوي صندوق U2 على 5 كريات منها: ثلاث كريات حمراء وكريتان خضراوان. جميع الكريات متماثلة ولا نفرق بينها باللمس.

نسحب عشوائيا 3 كريات بالكيفية التالية: نسحب كرية واحدة من U1 ونسجل لونها.
- إذا كانت الكرية المسحوبة حمراء نعيدها إلى U1 ثم نسحب منه عشوائيا كريتين في آن واحد.
- وإذا كانت الكرية المسحوبة خضراء نضعها في U2 ثم نسحب منه عشوائيا كريتين في آن واحد.

نعتبر الحوادث:
R: "الحصول على كرية حمراء"
V: "الحصول على كرية خضراء"
A: "الحصول على 3 كريات من نفس اللون"
B: "الحصول على كرية خضراء على الأقل"

1) انقل وأكمل شجرة الاحتمالات المقابلة.
2) احسب احتمالي الحادثتين A وB.
3) ليكن X المتغير العشوائي الذي يرفق بكل عملية سحب للثلاث كريات، حسب الكيفية المتبعة، عدد الكريات الحمراء المسحوبة. عين قانون احتمال X ثم احسب أمله الرياضي.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 650 390" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2025 علوم تجريبية الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2025ExperimentalTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="195" x2="210" y2="105" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="45" y1="195" x2="210" y2="285" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="105" x2="455" y2="55" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="105" x2="455" y2="105" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="105" x2="455" y2="155" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="285" x2="455" y2="235" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="285" x2="455" y2="285" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <line x1="235" y1="285" x2="455" y2="335" marker-end="url(#bacTreeArrow2025ExperimentalTopic1)"></line>
        <text x="118" y="120">----</text>
        <text x="118" y="280">----</text>
        <text x="318" y="58">1/10</text>
        <text x="318" y="110">----</text>
        <text x="318" y="160">----</text>
        <text x="318" y="238">1/5</text>
        <text x="318" y="290">----</text>
        <text x="318" y="340">----</text>
        <text x="223" y="100">R</text>
        <text x="223" y="300">V</text>
        <text x="472" y="59">RR</text>
        <text x="472" y="109">RV</text>
        <text x="472" y="159">VV</text>
        <text x="472" y="239">RR</text>
        <text x="472" y="289">RV</text>
        <text x="472" y="339">VV</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في U1: 2 حمراء و3 خضراء. في U2: 3 حمراء و2 خضراء. نسحب أولا من U1: P(R)=2/5 وP(V)=3/5.</div>

1) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 650 390" role="img" aria-label="الشجرة المكتملة لبكالوريا 2025 علوم تجريبية الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2025ExperimentalTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="195" x2="210" y2="105" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="45" y1="195" x2="210" y2="285" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="105" x2="455" y2="55" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="105" x2="455" y2="105" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="105" x2="455" y2="155" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="285" x2="455" y2="235" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="285" x2="455" y2="285" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <line x1="235" y1="285" x2="455" y2="335" marker-end="url(#bacTreeArrow2025ExperimentalTopic1Solved)"></line>
  <text x="118" y="120">2/5</text>
  <text x="118" y="280">3/5</text>
  <text x="318" y="58">1/10</text>
  <text x="318" y="110">3/5</text>
  <text x="318" y="160">3/10</text>
  <text x="318" y="238">1/5</text>
  <text x="318" y="290">3/5</text>
  <text x="318" y="340">1/5</text>
  <text x="223" y="100">R</text>
  <text x="223" y="300">V</text>
  <text x="472" y="59">RR</text>
  <text x="472" y="109">RV</text>
  <text x="472" y="159">VV</text>
  <text x="472" y="239">RR</text>
  <text x="472" y="289">RV</text>
  <text x="472" y="339">VV</text>
</svg>

إذا كانت الأولى حمراء، نعيدها إلى U1 فيبقى U1: 2R و3V، ومنه:
P(RR/R)=C(2,2)/C(5,2)=1/10، P(RV/R)=2×3/10=3/5، P(VV/R)=C(3,2)/C(5,2)=3/10.

إذا كانت الأولى خضراء، نضعها في U2 فيصبح U2: 3R و3V، ومنه:
P(RR/V)=C(3,2)/C(6,2)=1/5، P(RV/V)=3×3/15=3/5، P(VV/V)=C(3,2)/C(6,2)=1/5.

2) احتمال A: الحصول على 3 كريات من نفس اللون:

A يتحقق في المسارين R ثم RR أو V ثم VV.
P(A)=P(R)P(RR/R)+P(V)P(VV/V)
=2/5×1/10 + 3/5×1/5
=1/25+3/25
=4/25

<p class="property-box"><strong>النتيجة:</strong> P(A)=4/25.</p>

احتمال B: الحصول على كرية خضراء على الأقل.
نستعمل المتممة: عدم الحصول على أي كرية خضراء يعني الحصول على 3 كريات حمراء، وهو المسار R ثم RR.

P(B)=1-P(R∩RR)
=1-2/5×1/10
=1-1/25
=24/25

<p class="property-box"><strong>النتيجة:</strong> P(B)=24/25.</p>

3) قانون احتمال X، حيث X هو عدد الكريات الحمراء المسحوبة:

• X=3: المسار R ثم RR، احتماله 1/25.
• X=2: المساران R ثم RV أو V ثم RR، احتماله 2/5×3/5 + 3/5×1/5 = 6/25+3/25=9/25.
• X=1: المساران R ثم VV أو V ثم RV، احتماله 2/5×3/10 + 3/5×3/5 = 3/25+9/25=12/25.
• X=0: المسار V ثم VV، احتماله 3/5×1/5=3/25.

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=3/25، P(X=1)=12/25، P(X=2)=9/25، P(X=3)=1/25.</p>

الأمل الرياضي:
E(X)=0×3/25 + 1×12/25 + 2×9/25 + 3×1/25
=(12+18+3)/25
=33/25

<p class="property-box"><strong>النتيجة:</strong> E(X)=33/25.</p>`
  },
  {
    id: 45,
    track: "experimental",
    year: 2025,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

I) يحتوي صندوق U1 على 6 كريات متماثلة ولا نفرق بينها باللمس، منها: 3 كريات خضراء، كريتان حمراوان وكرية بيضاء واحدة. نسحب عشوائيا من الصندوق U1 كريتين في آن واحد ونعتبر الحادثتين:
E: "الحصول على كرية حمراء واحدة فقط"
F: "الحصول على كريتين من نفس اللون"

1) احسب P(E) احتمال الحادثة E.
2) بين أن احتمال الحادثة F يساوي 4/15 ثم استنتج احتمال الحصول على كريتين من لونين مختلفين.

II) يحتوي صندوق آخر U2 على 6 كريات متماثلة ولا نفرق بينها باللمس، منها: 4 كريات خضراء وكريتان حمراوان. نرمز بـ V وR وB إلى: خضراء، حمراء، بيضاء على الترتيب.
نسحب عشوائيا من U2 كرية واحدة ونسجل لونها.
- إذا كانت الكرية المسحوبة خضراء، نسحب كرية أخرى من U2 دون إرجاع الكرية الأولى.
- وإذا كانت الكرية المسحوبة حمراء، نسحب كرية واحدة من U1.

1) انقل وأكمل شجرة الاحتمالات المقابلة.
2) أ) ما احتمال الحصول على كرية حمراء في السحب الثاني؟
   ب) بين أن احتمال الحصول على كرية خضراء في السحب الأول، علما أن الكرية الثانية المسحوبة حمراء، يساوي 12/17.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 620 340" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2025 علوم تجريبية الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2025ExperimentalTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="170" x2="215" y2="90" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="45" y1="170" x2="215" y2="250" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="240" y1="90" x2="455" y2="55" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="240" y1="90" x2="455" y2="125" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="240" y1="250" x2="455" y2="205" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="240" y1="250" x2="455" y2="250" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <line x1="240" y1="250" x2="455" y2="295" marker-end="url(#bacTreeArrow2025ExperimentalTopic2)"></line>
        <text x="118" y="105">----</text>
        <text x="118" y="245">----</text>
        <text x="320" y="58">----</text>
        <text x="320" y="130">----</text>
        <text x="320" y="208">----</text>
        <text x="320" y="255">----</text>
        <text x="320" y="300">----</text>
        <text x="228" y="84">V</text>
        <text x="228" y="265">R</text>
        <text x="472" y="59">V</text>
        <text x="472" y="129">R</text>
        <text x="472" y="209">V</text>
        <text x="472" y="254">R</text>
        <text x="472" y="299">B</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>الجزء I:</strong> في U1 توجد 3 خضراء، 2 حمراء، 1 بيضاء. نسحب كريتين في آن واحد؛ عدد الحالات الكلية C(6,2)=15.</div>

I) 1) احتمال الحصول على كرية حمراء واحدة فقط:
نختار حمراء واحدة من 2، وغير حمراء واحدة من 4.

P(E)=C(2,1)C(4,1)/C(6,2)
=2×4/15
=8/15

<p class="property-box"><strong>النتيجة:</strong> P(E)=8/15.</p>

I) 2) احتمال الحصول على كريتين من نفس اللون:

P(F)=[C(3,2)+C(2,2)+C(1,2)]/C(6,2)
=(3+1+0)/15
=4/15

<p class="property-box"><strong>تبيان:</strong> P(F)=4/15.</p>

احتمال الحصول على كريتين من لونين مختلفين هو متممة F:

P(F̄)=1-P(F)=1-4/15=11/15

<p class="property-box"><strong>النتيجة:</strong> احتمال لونين مختلفين هو 11/15.</p>

<div class="definition-box"><strong>الجزء II:</strong> في U2 توجد 4 خضراء و2 حمراء. إذا ظهرت خضراء نسحب ثانية من U2 دون إرجاع. إذا ظهرت حمراء نسحب من U1.</div>

II) 1) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 620 340" role="img" aria-label="الشجرة المكتملة لبكالوريا 2025 علوم تجريبية الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2025ExperimentalTopic2Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="170" x2="215" y2="90" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="45" y1="170" x2="215" y2="250" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="90" x2="455" y2="55" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="90" x2="455" y2="125" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="250" x2="455" y2="205" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="250" x2="455" y2="250" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <line x1="240" y1="250" x2="455" y2="295" marker-end="url(#bacTreeArrow2025ExperimentalTopic2Solved)"></line>
  <text x="118" y="105">2/3</text>
  <text x="118" y="245">1/3</text>
  <text x="320" y="58">3/5</text>
  <text x="320" y="130">2/5</text>
  <text x="320" y="208">1/2</text>
  <text x="320" y="255">1/3</text>
  <text x="320" y="300">1/6</text>
  <text x="228" y="84">V</text>
  <text x="228" y="265">R</text>
  <text x="472" y="59">V</text>
  <text x="472" y="129">R</text>
  <text x="472" y="209">V</text>
  <text x="472" y="254">R</text>
  <text x="472" y="299">B</text>
</svg>

2) أ) احتمال الحصول على كرية حمراء في السحب الثاني:

P(R₂)=P(V ثم R)+P(R ثم R)
=P(V)P(R/V)+P(R)P(R/R)
=2/3×2/5 + 1/3×1/3
=4/15+1/9
=12/45+5/45
=17/45

<p class="property-box"><strong>النتيجة:</strong> P(R₂)=17/45.</p>

ب) احتمال أن تكون الأولى خضراء علما أن الثانية حمراء:

P(V/R₂)=P(V∩R₂)/P(R₂)
=(2/3×2/5)/(17/45)
=(4/15)/(17/45)
=4/15×45/17
=12/17

<p class="property-box"><strong>تبيان:</strong> P(V/R₂)=12/17.</p>`
  },
  {
    id: 46,
    track: "experimental",
    year: 2024,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 5 قطع كهربائية غير متماثلة ولا نفرق بينها باللمس، منها 3 قطع سليمة وقطعتان غير سليمتين. نرمز إلى القطعة السليمة بالرمز S وإلى القطعة غير السليمة بالرمز S̄.

نسحب عشوائيا من الكيس 3 قطع على التوالي مع الإرجاع، ونعتبر الحوادث:
A: "القطعة الأولى المسحوبة سليمة"
B: "سحب قطعة واحدة فقط سليمة"
C: "القطعة الثالثة المسحوبة سليمة"

1) شكل شجرة الاحتمالات التي تنمذج هذه التجربة.
2) احسب P(A) وP(B) احتمالي الحادثتين A وB، ثم بين أن P(C)=3/5.
3) احسب الاحتمال الشرطي P_C(A). هل الحادثتان A وC مستقلتان؟
4) نرفق بكل قطعة سليمة العدد 10 وبكل قطعة غير سليمة العدد -10، ونعتبر X المتغير العشوائي الذي يرفق بكل عملية سحب من الكيس ثلاث قطع مجموع الأعداد المرفقة بها.
أ) برر أن قيم المتغير العشوائي X هي: -30، -10، 10، 30.
ب) عين قانون احتمال المتغير العشوائي X ثم احسب أمله الرياضي E(X).`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 760 460" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2024 علوم تجريبية الموضوع الثاني">
        <defs>
          <marker id="bacTreeArrow2024ExperimentalTopic2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="35" y1="230" x2="165" y2="125" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="35" y1="230" x2="165" y2="335" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="190" y1="125" x2="335" y2="75" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="190" y1="125" x2="335" y2="175" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="190" y1="335" x2="335" y2="285" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="190" y1="335" x2="335" y2="385" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="75" x2="520" y2="45" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="75" x2="520" y2="105" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="175" x2="520" y2="145" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="175" x2="520" y2="205" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="285" x2="520" y2="255" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="285" x2="520" y2="315" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="385" x2="520" y2="355" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <line x1="360" y1="385" x2="520" y2="415" marker-end="url(#bacTreeArrow2024ExperimentalTopic2)"></line>
        <text x="92" y="130">----</text><text x="92" y="330">----</text>
        <text x="250" y="78">----</text><text x="250" y="178">----</text><text x="250" y="288">----</text><text x="250" y="388">----</text>
        <text x="430" y="48">----</text><text x="430" y="108">----</text><text x="430" y="148">----</text><text x="430" y="208">----</text>
        <text x="430" y="258">----</text><text x="430" y="318">----</text><text x="430" y="358">----</text><text x="430" y="418">----</text>
        <text x="178" y="119">S</text><text x="178" y="350">S̄</text>
        <text x="348" y="69">S</text><text x="348" y="190">S̄</text><text x="348" y="279">S</text><text x="348" y="400">S̄</text>
        <text x="535" y="49">S</text><text x="535" y="109">S̄</text><text x="535" y="149">S</text><text x="535" y="209">S̄</text>
        <text x="535" y="259">S</text><text x="535" y="319">S̄</text><text x="535" y="359">S</text><text x="535" y="419">S̄</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في كل سحب، وبما أن السحب مع الإرجاع: P(S)=3/5 وP(S̄)=2/5.</div>

1) شجرة الاحتمالات:

<svg class="bac-tree" viewBox="0 0 760 460" role="img" aria-label="الشجرة المكتملة لبكالوريا 2024 علوم تجريبية الموضوع الثاني">
  <defs>
    <marker id="bacTreeArrow2024ExperimentalTopic2Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="35" y1="230" x2="165" y2="125" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="35" y1="230" x2="165" y2="335" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="190" y1="125" x2="335" y2="75" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="190" y1="125" x2="335" y2="175" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="190" y1="335" x2="335" y2="285" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="190" y1="335" x2="335" y2="385" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="75" x2="520" y2="45" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="75" x2="520" y2="105" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="175" x2="520" y2="145" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="175" x2="520" y2="205" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="285" x2="520" y2="255" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="285" x2="520" y2="315" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="385" x2="520" y2="355" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <line x1="360" y1="385" x2="520" y2="415" marker-end="url(#bacTreeArrow2024ExperimentalTopic2Solved)"></line>
  <text x="92" y="130">3/5</text><text x="92" y="330">2/5</text>
  <text x="250" y="78">3/5</text><text x="250" y="178">2/5</text><text x="250" y="288">3/5</text><text x="250" y="388">2/5</text>
  <text x="430" y="48">3/5</text><text x="430" y="108">2/5</text><text x="430" y="148">3/5</text><text x="430" y="208">2/5</text>
  <text x="430" y="258">3/5</text><text x="430" y="318">2/5</text><text x="430" y="358">3/5</text><text x="430" y="418">2/5</text>
  <text x="178" y="119">S</text><text x="178" y="350">S̄</text>
  <text x="348" y="69">S</text><text x="348" y="190">S̄</text><text x="348" y="279">S</text><text x="348" y="400">S̄</text>
  <text x="535" y="49">S</text><text x="535" y="109">S̄</text><text x="535" y="149">S</text><text x="535" y="209">S̄</text>
  <text x="535" y="259">S</text><text x="535" y="319">S̄</text><text x="535" y="359">S</text><text x="535" y="419">S̄</text>
</svg>

2) حساب الاحتمالات:

P(A)=P(S في السحب الأول)=3/5

B: سحب قطعة واحدة فقط سليمة من 3 سحبات.

P(B)=C(3,1)(3/5)(2/5)²
=3×3/5×4/25
=36/125

C: القطعة الثالثة سليمة.

P(C)=3/5

<p class="property-box"><strong>النتائج:</strong> P(A)=3/5، P(B)=36/125، P(C)=3/5.</p>

3) حساب P_C(A):

بما أن السحوبات مع الإرجاع، فالنتائج مستقلة من سحب إلى آخر.

P(A∩C)=P(A)P(C)=3/5×3/5=9/25

P_C(A)=P(A∩C)/P(C)
=(9/25)/(3/5)
=3/5

وبما أن P_C(A)=P(A)، فإن الحادثتين A وC مستقلتان.

<p class="property-box"><strong>النتيجة:</strong> P_C(A)=3/5، والحادثتان A وC مستقلتان.</p>

4) المتغير العشوائي X:
كل قطعة سليمة تقابل 10، وكل قطعة غير سليمة تقابل -10.
إذا كان عدد القطع السليمة المسحوبة هو k من بين 3، فإن:
X=10k-10(3-k)=20k-30

لـ k=0،1،2،3 نحصل على القيم:
-30، -10، 10، 30.

<p class="property-box"><strong>تبرير:</strong> قيم X هي: -30، -10، 10، 30.</p>

قانون احتمال X:

• X=-30 يعني k=0:
P(X=-30)=(2/5)³=8/125

• X=-10 يعني k=1:
P(X=-10)=C(3,1)(3/5)(2/5)²=36/125

• X=10 يعني k=2:
P(X=10)=C(3,2)(3/5)²(2/5)=54/125

• X=30 يعني k=3:
P(X=30)=(3/5)³=27/125

<p class="property-box"><strong>قانون X:</strong><br>
P(X=-30)=8/125، P(X=-10)=36/125، P(X=10)=54/125، P(X=30)=27/125.</p>

E(X)=(-30)×8/125 + (-10)×36/125 + 10×54/125 + 30×27/125
=(-240-360+540+810)/125
=750/125
=6

<p class="property-box"><strong>النتيجة:</strong> E(X)=6.</p>`
  },
  {
    id: 47,
    track: "experimental",
    year: 2023,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق U1 على 5 كرات تحمل الأرقام 1، 1، 1، 2، 3، ويحتوي صندوق U2 على 4 كرات تحمل الأرقام 1، 1، 2، 2. كل الكرات متماثلة ولا نفرق بينها عند اللمس.

نختار عشوائيا أحد الصندوقين ونسحب منه عشوائيا كرتين في آن واحد.

1) نعتبر الحوادث:
A: "سحب كرتين تحملان رقمين فرديين"
B: "سحب كرتين تحملان رقمين زوجيين"
C: "سحب كرتين إحداهما تحمل رقما فرديا والأخرى تحمل رقما زوجيا"

أ) أنجز الشجرة التي تنمذج هذه التجربة.
ب) بين أن P(A)=23/60 و P(B)=1/12 ثم احسب P(C).

2) نفرغ محتوى الصندوقين U1 وU2 في صندوق جديد U3 ثم نسحب منه عشوائيا كرتين في آن واحد.
X المتغير العشوائي الذي يرفق بكل عملية سحب لكرتين جداء الرقمين المسجلين عليهما.
أ) برر أن مجموعة قيم X هي {1،2،3،4،6}.
ب) عين قانون الاحتمال للمتغير العشوائي X ثم احسب أمله الرياضي E(X).`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 650 330" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2023 علوم تجريبية الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2023ExperimentalTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="90" x2="445" y2="90" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="240" x2="445" y2="240" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2023ExperimentalTopic1)"></line>
        <text x="118" y="103">1/2</text><text x="118" y="235">1/2</text>
        <text x="320" y="58">----</text><text x="320" y="94">----</text><text x="320" y="130">----</text>
        <text x="320" y="208">----</text><text x="320" y="244">----</text><text x="320" y="280">----</text>
        <text x="228" y="84">U1</text><text x="228" y="255">U2</text>
        <text x="462" y="59">A</text><text x="462" y="94">B</text><text x="462" y="129">C</text>
        <text x="462" y="209">A</text><text x="462" y="244">B</text><text x="462" y="279">C</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> U1 يحتوي 4 كرات فردية الأرقام وكرية واحدة زوجية. U2 يحتوي كرتين فرديتين وكرتين زوجيتين. نختار أحد الصندوقين باحتمال 1/2.</div>

1) أ) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 650 330" role="img" aria-label="الشجرة المكتملة لبكالوريا 2023 علوم تجريبية الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2023ExperimentalTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="90" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="240" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2023ExperimentalTopic1Solved)"></line>
  <text x="118" y="103">1/2</text><text x="118" y="235">1/2</text>
  <text x="320" y="58">3/5</text><text x="320" y="94">0</text><text x="320" y="130">2/5</text>
  <text x="320" y="208">1/6</text><text x="320" y="244">1/6</text><text x="320" y="280">2/3</text>
  <text x="228" y="84">U1</text><text x="228" y="255">U2</text>
  <text x="462" y="59">A</text><text x="462" y="94">B</text><text x="462" y="129">C</text>
  <text x="462" y="209">A</text><text x="462" y="244">B</text><text x="462" y="279">C</text>
</svg>

في U1: C(5,2)=10.
P(A/U1)=C(4,2)/10=6/10=3/5
P(B/U1)=0 لأن في U1 كرة زوجية واحدة فقط.
P(C/U1)=C(4,1)C(1,1)/10=4/10=2/5

في U2: C(4,2)=6.
P(A/U2)=C(2,2)/6=1/6
P(B/U2)=C(2,2)/6=1/6
P(C/U2)=C(2,1)C(2,1)/6=4/6=2/3

ب) حساب P(A) وP(B) وP(C):

P(A)=1/2×3/5 + 1/2×1/6
=3/10+1/12
=18/60+5/60
=23/60

P(B)=1/2×0 + 1/2×1/6
=1/12

<p class="property-box"><strong>تبيان:</strong> P(A)=23/60 و P(B)=1/12.</p>

P(C)=1-P(A)-P(B)
=1-23/60-1/12
=60/60-23/60-5/60
=32/60=8/15

<p class="property-box"><strong>النتيجة:</strong> P(C)=8/15.</p>

2) في الصندوق U3 بعد الدمج توجد 9 كرات أرقامها:
1،1،1،1،1، 2،2،2، 3.
أي: خمس كرات تحمل 1، ثلاث كرات تحمل 2، وكرية واحدة تحمل 3.
نسحب كرتين في آن واحد، وعدد الحالات الكلية C(9,2)=36.

أ) الجداءات الممكنة هي:
1×1=1، 1×2=2، 1×3=3، 2×2=4، 2×3=6.
إذن مجموعة قيم X هي {1،2،3،4،6}.

ب) قانون احتمال X:

P(X=1)=C(5,2)/36=10/36=5/18
P(X=2)=C(5,1)C(3,1)/36=15/36=5/12
P(X=3)=C(5,1)C(1,1)/36=5/36
P(X=4)=C(3,2)/36=3/36=1/12
P(X=6)=C(3,1)C(1,1)/36=3/36=1/12

<p class="property-box"><strong>قانون X:</strong><br>
P(X=1)=5/18، P(X=2)=5/12، P(X=3)=5/36، P(X=4)=1/12، P(X=6)=1/12.</p>

E(X)=1×5/18 + 2×5/12 + 3×5/36 + 4×1/12 + 6×1/12
=10/36+30/36+15/36+12/36+18/36
=85/36

<p class="property-box"><strong>النتيجة:</strong> E(X)=85/36.</p>`
  },
  {
    id: 48,
    track: "experimental",
    year: 2023,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي كيس على 10 كريات متماثلة ولا نفرق بينها باللمس، موزعة كما يلي:
3 كريات بيضاء مرقمة بـ: 1، 1، 2.
3 كريات حمراء مرقمة بـ: 1، 2، 2.
4 كريات خضراء مرقمة بـ: 1، 2، 2، 2.

نسحب عشوائيا وفي آن واحد كريتين من الكيس ونعتبر الحوادث A وB وC الآتية:
A: "الحصول على كريتين من نفس اللون"
B: "الحصول على كرية خضراء على الأقل"
C: "الحصول على كريتين تحملان رقمين زوجيين"

1) أ) بين أن احتمال الحدث A يساوي 4/15 وأن احتمال الحدث B يساوي 2/3.
ب) احسب الاحتمالين P(C) وP(A∩C). هل الحادثتان A وC مستقلتان؟
ج) استنتج احتمال الحصول على كريتين من نفس اللون علما أنهما تحملان رقمين زوجيين.

2) نعتبر المتغير العشوائي X الذي يرفق بكل عملية سحب لكريتين مجموع الرقمين المسجلين عليهما.
أ) برر أن مجموعة قيم المتغير العشوائي X هي {2،3،4}.
ب) عين قانون احتمال المتغير العشوائي X ثم احسب أمله الرياضي E(X).`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد الكريات الكلي 10. البيضاء 3، الحمراء 3، الخضراء 4. عدد الكريات التي تحمل الرقم 1 هو 4، وعدد الكريات التي تحمل الرقم 2 هو 6. نسحب كريتين في آن واحد؛ عدد الحالات الكلية C(10,2)=45.</div>

1) أ) حساب P(A):

A: الحصول على كريتين من نفس اللون.

P(A)=[C(3,2)+C(3,2)+C(4,2)]/C(10,2)
=(3+3+6)/45
=12/45
=4/15

<p class="property-box"><strong>تبيان:</strong> P(A)=4/15.</p>

حساب P(B):
B: الحصول على كرية خضراء على الأقل.
نستعمل المتممة: لا نحصل على أي كرية خضراء، أي نسحب كريتين من غير الخضراء وعددها 6.

P(B)=1-C(6,2)/C(10,2)
=1-15/45
=30/45
=2/3

<p class="property-box"><strong>تبيان:</strong> P(B)=2/3.</p>

ب) حساب P(C):
C: الحصول على كريتين تحملان رقمين زوجيين، أي الرقم 2 والرقم 2.
عدد الكريات التي تحمل الرقم 2 هو 6.

P(C)=C(6,2)/C(10,2)
=15/45
=1/3

حساب P(A∩C):
نريد كريتين من نفس اللون وتحملان الرقم 2.
• البيضاء: توجد كرية واحدة تحمل 2، لا تكفي.
• الحمراء: توجد كريتان تحملان 2، حالة واحدة.
• الخضراء: توجد ثلاث كريات تحمل 2، عدد الحالات C(3,2)=3.

عدد الحالات الملائمة = 1+3=4.

P(A∩C)=4/45

دراسة الاستقلال:
P(A)P(C)=4/15×1/3=4/45
وهذا يساوي P(A∩C).

<p class="property-box"><strong>النتيجة:</strong> P(C)=1/3، P(A∩C)=4/45، والحادثتان A وC مستقلتان.</p>

ج) احتمال الحصول على كريتين من نفس اللون علما أنهما تحملان رقمين زوجيين:

P_C(A)=P(A∩C)/P(C)
=(4/45)/(1/3)
=4/15

<p class="property-box"><strong>النتيجة:</strong> P_C(A)=4/15.</p>

2) المتغير العشوائي X:
الأرقام الممكنة على الكريات هي 1 و2 فقط. عند سحب كريتين، مجموع الرقمين يمكن أن يكون:
1+1=2، أو 1+2=3، أو 2+2=4.
إذن مجموعة قيم X هي {2،3،4}.

قانون احتمال X:

P(X=2)=C(4,2)/C(10,2)=6/45=2/15

P(X=3)=C(4,1)C(6,1)/C(10,2)=24/45=8/15

P(X=4)=C(6,2)/C(10,2)=15/45=1/3

<p class="property-box"><strong>قانون X:</strong><br>
P(X=2)=2/15، P(X=3)=8/15، P(X=4)=1/3.</p>

E(X)=2×2/15 + 3×8/15 + 4×1/3
=4/15+24/15+20/15
=48/15
=16/5

<p class="property-box"><strong>النتيجة:</strong> E(X)=16/5.</p>`
  },
  {
    id: 49,
    track: "experimental",
    year: 2021,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

صندوق به 9 بطاقات متماثلة لا نفرق بينها باللمس، مكتوب على كل منها سؤال واحد:
منها ثلاثة أسئلة في الهندسة مرقمة بـ: 1، 2، 3، وأربعة أسئلة في الجبر مرقمة بـ: 1، 2، 3، 4، وسؤالان في التحليل مرقمان بـ: 1، 2.

نسحب عشوائيا بطاقة واحدة من الصندوق ونعتبر الحوادث التالية:
A: "سحب سؤال في الهندسة"
B: "سحب سؤال في التحليل"
C: "سحب سؤال في الجبر يحمل رقما زوجيا"

1) احسب P(A)، P(B)، P(C) احتمالات الحوادث A وB وC على الترتيب.
2) احسب احتمال سحب سؤال رقمه مختلف عن 1.
3) المتغير العشوائي X يرفق بكل بطاقة مسحوبة رقم السؤال المسجل عليها.
أ) برر أن مجموعة قيم X هي {1،2،3،4}.
ب) عين قانون الاحتمال للمتغير العشوائي X ثم احسب أمله الرياضي E(X).
ج) استنتج قيمة E(2021X+1442).`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> عدد البطاقات الكلي 9. الهندسة: 3 بطاقات أرقامها 1،2،3. الجبر: 4 بطاقات أرقامها 1،2،3،4. التحليل: بطاقتان رقماهما 1،2.</div>

1) حساب الاحتمالات:

A: سحب سؤال في الهندسة.
P(A)=3/9=1/3

B: سحب سؤال في التحليل.
P(B)=2/9

C: سحب سؤال في الجبر يحمل رقما زوجيا.
في الجبر الأرقام الزوجية هي 2 و4، إذن حالتان من أصل 9.
P(C)=2/9

<p class="property-box"><strong>النتائج:</strong> P(A)=1/3، P(B)=2/9، P(C)=2/9.</p>

2) احتمال سحب سؤال رقمه مختلف عن 1:
عدد البطاقات التي تحمل الرقم 1 هو 3: واحدة في الهندسة، واحدة في الجبر، واحدة في التحليل.
إذن عدد البطاقات التي رقمها مختلف عن 1 هو 9-3=6.

P=6/9=2/3

<p class="property-box"><strong>النتيجة:</strong> الاحتمال هو 2/3.</p>

3) المتغير العشوائي X:
أ) الأرقام الموجودة على البطاقات هي 1،2،3،4، إذن مجموعة قيم X هي:
X(Ω)={1،2،3،4}

ب) قانون احتمال X:

• الرقم 1 موجود في الهندسة والجبر والتحليل: 3 بطاقات.
P(X=1)=3/9=1/3

• الرقم 2 موجود في الهندسة والجبر والتحليل: 3 بطاقات.
P(X=2)=3/9=1/3

• الرقم 3 موجود في الهندسة والجبر فقط: بطاقتان.
P(X=3)=2/9

• الرقم 4 موجود في الجبر فقط: بطاقة واحدة.
P(X=4)=1/9

<p class="property-box"><strong>قانون X:</strong><br>
P(X=1)=1/3، P(X=2)=1/3، P(X=3)=2/9، P(X=4)=1/9.</p>

E(X)=1×1/3 + 2×1/3 + 3×2/9 + 4×1/9
=3/9+6/9+6/9+4/9
=19/9

<p class="property-box"><strong>النتيجة:</strong> E(X)=19/9.</p>

ج) باستعمال خطية الأمل الرياضي:

E(2021X+1442)=2021E(X)+1442
=2021×19/9+1442
=38399/9+12978/9
=51377/9

<p class="property-box"><strong>النتيجة:</strong> E(2021X+1442)=51377/9.</p>`
  },
  {
    id: 50,
    track: "experimental",
    year: 2020,
    topic: "الموضوع الأول",
    text: `التمرين الأول: (04 نقاط)

يحتوي وعاء U على 4 كرات حمراء و6 سوداء، ويحتوي وعاء V على 5 كرات حمراء و3 سوداء. كل الكرات متماثلة ولا نفرق بينها عند اللمس.

نسحب عشوائيا كرتين في آن واحد من أحد الوعاءين بالكيفية التالية:
نقوم بسحب بطاقة واحدة عشوائيا من كيس يحتوي على 6 بطاقات متماثلة ومرقمة من 1 إلى 6؛ إذا تحصلنا على أحد الرقمين 3 أو 5 نسحب الكرتين من U، وفي باقي الحالات نسحب الكرتين من V.

نسمي الحدث:
A: "الحصول على أحد الرقمين 3 و5"
M: "الحصول على كرتين من نفس اللون"

1) تحقق أن P(Ā)، احتمال السحب من الوعاء V، هو 2/3.
2) علما أن الكرتين المسحوبتين من U، بين أن احتمال أن تكونا من نفس اللون هو 7/15.
3) انقل شجرة الاحتمالات المقابلة ثم أكملها واستنتج P(M).
4) احسب P_M̄(A) احتمال السحب من الوعاء U علما أن الكرتين المسحوبتين مختلفتا اللون.`,
    diagram: `
      <svg class="bac-tree" viewBox="0 0 620 330" role="img" aria-label="شجرة احتمالات ناقصة لبكالوريا 2020 علوم تجريبية الموضوع الأول">
        <defs>
          <marker id="bacTreeArrow2020ExperimentalTopic1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2020ExperimentalTopic1)"></line>
        <text x="118" y="103">----</text>
        <text x="118" y="235">----</text>
        <text x="320" y="58">----</text>
        <text x="320" y="130">----</text>
        <text x="320" y="208">13/28</text>
        <text x="320" y="280">----</text>
        <text x="228" y="84">A</text>
        <text x="228" y="255">Ā</text>
        <text x="462" y="59">M</text>
        <text x="462" y="129">M̄</text>
        <text x="462" y="209">M</text>
        <text x="462" y="279">M̄</text>
      </svg>
    `,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> A يعني ظهور 3 أو 5، وبالتالي السحب من U. أما Ā فيعني السحب من V.</div>

1) احتمال السحب من V:

P(A)=2/6=1/3
إذن:
P(Ā)=1-P(A)=2/3

<p class="property-box"><strong>تأكيد:</strong> P(Ā)=2/3.</p>

2) علما أن السحب من U:
في U توجد 4 حمراء و6 سوداء، وعدد الحالات الكلية C(10,2)=45.

احتمال كرتين من نفس اللون:
P(M/A)=[C(4,2)+C(6,2)]/C(10,2)
=(6+15)/45
=21/45
=7/15

<p class="property-box"><strong>تبيان:</strong> P(M/A)=7/15.</p>

3) الشجرة المكتملة:

<svg class="bac-tree" viewBox="0 0 620 330" role="img" aria-label="الشجرة المكتملة لبكالوريا 2020 علوم تجريبية الموضوع الأول">
  <defs>
    <marker id="bacTreeArrow2020ExperimentalTopic1Solved" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z"></path>
    </marker>
  </defs>
  <line x1="45" y1="165" x2="215" y2="90" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <line x1="45" y1="165" x2="215" y2="240" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="55" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="90" x2="445" y2="125" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="205" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <line x1="240" y1="240" x2="445" y2="275" marker-end="url(#bacTreeArrow2020ExperimentalTopic1Solved)"></line>
  <text x="118" y="103">1/3</text>
  <text x="118" y="235">2/3</text>
  <text x="320" y="58">7/15</text>
  <text x="320" y="130">8/15</text>
  <text x="320" y="208">13/28</text>
  <text x="320" y="280">15/28</text>
  <text x="228" y="84">A</text>
  <text x="228" y="255">Ā</text>
  <text x="462" y="59">M</text>
  <text x="462" y="129">M̄</text>
  <text x="462" y="209">M</text>
  <text x="462" y="279">M̄</text>
</svg>

في V توجد 5 حمراء و3 سوداء، وعدد الحالات الكلية C(8,2)=28.

P(M/Ā)=[C(5,2)+C(3,2)]/C(8,2)
=(10+3)/28
=13/28

إذن:
P(M)=P(A)P(M/A)+P(Ā)P(M/Ā)
=1/3×7/15 + 2/3×13/28
=7/45+26/84
=98/630+195/630
=293/630

<p class="property-box"><strong>النتيجة:</strong> P(M)=293/630.</p>

4) احتمال السحب من U علما أن الكرتين مختلفتا اللون:

P(A/M̄)=P(A∩M̄)/P(M̄)

P(A∩M̄)=P(A)P(M̄/A)
=1/3×8/15
=8/45

P(M̄)=1-P(M)=1-293/630=337/630

إذن:
P(A/M̄)=(8/45)/(337/630)
=8/45×630/337
=112/337

<p class="property-box"><strong>النتيجة:</strong> P_M̄(A)=112/337.</p>`
  },
  {
    id: 51,
    track: "experimental",
    year: 2019,
    topic: "الموضوع الثاني",
    text: `التمرين الأول: (04 نقاط)

يحتوي صندوق على 10 كريات لا نفرق بينها عند اللمس، منها كريتان تحملان الرقم 0، وثلاث تحمل الرقم 1، والكريات الأخرى تحمل الرقم 2. نسحب عشوائيا وفي آن واحد ثلاث كريات من الصندوق.

ليكن X المتغير العشوائي الذي يرفق بكل سحب جداء الأرقام المسجلة على الكريات المسحوبة.

1) عرف قانون الاحتمال للمتغير العشوائي X ثم احسب أمله الرياضي E(X).
2) بين أن احتمال الحصول على ثلاث كريات كل منها تحمل رقما زوجيا هو 7/24.
3) نسحب الآن من الصندوق كريتين على التوالي دون إرجاع. ما احتمال الحصول على كريتين تحملان رقمين مجموعهما فردي علما أن جداءهما زوجي؟`,
    solution: `<div class="definition-box"><strong>المعطيات:</strong> في الصندوق 10 كريات: كريتان تحملان 0، ثلاث كريات تحمل 1، وخمس كريات تحمل 2. في السحب الأول نسحب 3 كريات في آن واحد؛ عدد الحالات الكلية C(10,3)=120.</div>

1) قانون احتمال X:
X هو جداء الأرقام المسجلة على الكريات الثلاث.

القيم الممكنة لـ X هي: 0، 1، 2، 4، 8.

• X=0: يتحقق إذا ظهرت على الأقل كرية تحمل 0.
نستعمل المتممة: لا تظهر أي 0، أي نختار 3 كريات من الكريات الثماني التي تحمل 1 أو 2.
P(X=0)=1-C(8,3)/C(10,3)
=1-56/120
=64/120=8/15

• X=1: نختار 3 كريات تحمل الرقم 1.
P(X=1)=C(3,3)/120=1/120

• X=2: نختار كريتين تحملان 1 وكرية واحدة تحمل 2.
P(X=2)=C(3,2)C(5,1)/120
=15/120=1/8

• X=4: نختار كرية واحدة تحمل 1 وكريتين تحملان 2.
P(X=4)=C(3,1)C(5,2)/120
=30/120=1/4

• X=8: نختار 3 كريات تحمل الرقم 2.
P(X=8)=C(5,3)/120
=10/120=1/12

<p class="property-box"><strong>قانون X:</strong><br>
P(X=0)=8/15، P(X=1)=1/120، P(X=2)=1/8، P(X=4)=1/4، P(X=8)=1/12.</p>

E(X)=0×8/15 + 1×1/120 + 2×1/8 + 4×1/4 + 8×1/12
=1/120+1/4+1+2/3
=1/120+30/120+120/120+80/120
=231/120=77/40

<p class="property-box"><strong>النتيجة:</strong> E(X)=77/40.</p>

2) احتمال الحصول على ثلاث كريات كل منها تحمل رقما زوجيا:
الأرقام الزوجية هنا هي 0 و2. عدد الكريات التي تحمل رقما زوجيا هو 2+5=7.

P=C(7,3)/C(10,3)
=35/120
=7/24

<p class="property-box"><strong>تبيان:</strong> الاحتمال يساوي 7/24.</p>

3) نسحب كريتين على التوالي دون إرجاع:
نريد احتمال أن يكون مجموع الرقمين فرديا علما أن جداءهما زوجي.

ليكن:
A: "مجموع الرقمين فردي"
B: "جداء الرقمين زوجي"

مجموع الرقمين يكون فرديا إذا كان أحدهما فرديا والآخر زوجيا؛ أي واحدة تحمل 1 وواحدة تحمل 0 أو 2.
وبما أن وجود رقم زوجي مع 1 يجعل الجداء زوجيا فقط إذا كان الرقم الزوجي 0 أو 2، وهذا صحيح.
إذن A⊂B، ومنه:
P(A/B)=P(A)/P(B)

نحسب بالاختيارات غير المرتبة:
عدد الحالات الكلية لسحب كريتين هو C(10,2)=45.

A: نختار كرية تحمل 1 من 3، وكرية تحمل رقما زوجيا من 7:
عدد الحالات = 3×7=21
P(A)=21/45

B: الجداء زوجي يعني ألا يكون الرقمان فرديين معا.
متممة B هي سحب كريتين تحملان 1.
P(B)=1-C(3,2)/C(10,2)
=1-3/45
=42/45

إذن:
P(A/B)=(21/45)/(42/45)=1/2

<p class="property-box"><strong>النتيجة:</strong> الاحتمال الشرطي يساوي 1/2.</p>`
  }
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
  state.bacYearFilter = "الكل";
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
        <button class="${done ? "ghost-btn" : "primary-btn"}" type="button" data-open-module="${module.id}">${done ? "مراجعة" : "فتح الدرس"}</button>
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
      <button class="tab-btn ${state.moduleTab === "activities" ? "active" : ""}" type="button" data-module-tab="activities">أنشطة (${module.activities.length})</button>
      <button class="tab-btn ${state.moduleTab === "lesson" ? "active" : ""}" type="button" data-module-tab="lesson">درس</button>
      <button class="tab-btn ${state.moduleTab === "exercises" ? "active" : ""}" type="button" data-module-tab="exercises">تمارين محلولة (${module.exercises.length})</button>
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
      ${activity.visual || ""}
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
  const firstKey = "practice-main-1";
  const firstOpen = state.openSolutions[firstKey];
  const secondKey = "practice-main-2";
  const secondOpen = state.openSolutions[secondKey];
  const thirdKey = "practice-main-3";
  const thirdOpen = state.openSolutions[thirdKey];
  const fourthKey = "practice-main-4";
  const fourthOpen = state.openSolutions[fourthKey];
  const fifthKey = "practice-main-5";
  const fifthOpen = state.openSolutions[fifthKey];
  const sixthKey = "practice-main-6";
  const sixthOpen = state.openSolutions[sixthKey];
  const seventhKey = "practice-main-7";
  const seventhOpen = state.openSolutions[seventhKey];
  const eighthKey = "practice-main-8";
  const eighthOpen = state.openSolutions[eighthKey];
  const ninthKey = "practice-main-9";
  const ninthOpen = state.openSolutions[ninthKey];
  const thirteenthKey = "practice-main-13";
  const thirteenthOpen = state.openSolutions[thirteenthKey];
  const fourteenthKey = "practice-main-14";
  const fourteenthOpen = state.openSolutions[fourteenthKey];
  const twelfthKey = "practice-main-12";
  const twelfthOpen = state.openSolutions[twelfthKey];
  const newThirteenthKey = "practice-main-15";
  const newThirteenthOpen = state.openSolutions[newThirteenthKey];
  const wordArrangementsKey = "practice-main-16";
  const wordArrangementsOpen = state.openSolutions[wordArrangementsKey];
  const booksAndBallsKey = "practice-main-17";
  const booksAndBallsOpen = state.openSolutions[booksAndBallsKey];
  const phoneNumbersKey = "practice-main-18";
  const phoneNumbersOpen = state.openSolutions[phoneNumbersKey];
  const triangleColoringKey = "practice-main-19";
  const triangleColoringOpen = state.openSolutions[triangleColoringKey];
  const committeeDoctorsKey = "practice-main-20";
  const committeeDoctorsOpen = state.openSolutions[committeeDoctorsKey];
  const spiderPathsKey = "practice-main-21";
  const spiderPathsOpen = state.openSolutions[spiderPathsKey];
  const combinationsEquationsKey = "practice-main-22";
  const combinationsEquationsOpen = state.openSolutions[combinationsEquationsKey];
  const binomialInductionKey = "practice-main-23";
  const binomialInductionOpen = state.openSolutions[binomialInductionKey];
  const numberedBallsKey = "practice-main-24";
  const numberedBallsOpen = state.openSolutions[numberedBallsKey];
  const coloredNumberedBallsKey = "practice-main-25";
  const coloredNumberedBallsOpen = state.openSolutions[coloredNumberedBallsKey];
  const weightedDieKey = "practice-main-26";
  const weightedDieOpen = state.openSolutions[weightedDieKey];
  const twoWhiteBallsKey = "practice-main-27";
  const twoWhiteBallsOpen = state.openSolutions[twoWhiteBallsKey];
  const transferBetweenBagsKey = "practice-main-28";
  const transferBetweenBagsOpen = state.openSolutions[transferBetweenBagsKey];
  const adaptiveBoxKey = "practice-main-29";
  const adaptiveBoxOpen = state.openSolutions[adaptiveBoxKey];
  document.getElementById("practiceGrid").innerHTML = `
    <article class="exercise-card">
      <span class="label">تمرين 1</span>
      <h3>السحب من صندوق كرات</h3>
      <p>يحتوي صندوق على 12 كرة لا نفرق بينها عند اللمس. نسحب منه 4 كرات عشوائيًا.</p>
      <ol class="question-list">
        <li>إذا تم السحب في آن واحد، ما عدد الحالات الممكنة؟</li>
        <li>إذا تم السحب على التوالي دون إرجاع، ما عدد الحالات الممكنة؟</li>
        <li>إذا تم السحب على التوالي مع الإرجاع، ما عدد الحالات الممكنة؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${firstKey}">${firstOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${firstOpen ? "open" : ""}" id="solution-${firstKey}">
        <p>1. السحب في آن واحد يعني أن الترتيب لا يهم ودون إرجاع، لذلك عدد الحالات هو:</p>
        <div class="math-equation">C_12^4 = 12!/(4!8!) = 495</div>
        <p>2. السحب على التوالي دون إرجاع يعني أن الترتيب مهم ولا يوجد تكرار، لذلك عدد الحالات هو:</p>
        <div class="math-equation">A_12^4 = 12×11×10×9 = 11880</div>
        <p>3. السحب على التوالي مع الإرجاع يعني أن الترتيب مهم والتكرار ممكن، لذلك عدد الحالات هو:</p>
        <div class="math-equation">12^4 = 20736</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 2</span>
      <h3>حساب مجموعين باستعمال ثنائي الحد</h3>
      <p>احسب المجموعين التاليين:</p>
      <div class="math-equation">A = Σ_(k=0)^n C_n^k 1/(2^k)</div>
      <div class="math-equation">B = Σ_(k=0)^n C_n^k 3^(n-k)/4^k</div>
      <button class="solution-toggle" type="button" data-solution="${secondKey}">${secondOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${secondOpen ? "open" : ""}" id="solution-${secondKey}">
        <div class="definition-box">
          <strong>تذكير:</strong> دستور ثنائي الحد يؤكد أنه لكل عدد طبيعي <span class="math">n</span> ولكل عددين حقيقيين <span class="math">a</span> و <span class="math">b</span>:
          <div class="math-equation">(a+b)^n = Σ_(k=0)^n C_n^k a^(n-k) b^k</div>
          حيث <span class="math">C_n^k</span> هو معامل ثنائي الحد، أي عدد طرق اختيار <span class="math">k</span> عنصر من مجموعة مكوّنة من <span class="math">n</span> عنصر.
        </div>
        <p><strong>حساب المجموع الأول <span class="math">A</span>:</strong></p>
        <p>لاحظ أن <span class="math">1/(2^k) = (1/2)^k</span>، ويمكن إدخال العامل <span class="math">1^(n-k)</span> (الذي يساوي <span class="math">1</span>) دون تغيير قيمة المجموع:</p>
        <div class="math-equation">A = Σ_(k=0)^n C_n^k 1^(n-k) (1/2)^k</div>
        <p>نطبّق دستور ثنائي الحد مع <span class="math">a = 1</span> و <span class="math">b = 1/2</span>:</p>
        <div class="math-equation">A = (1 + 1/2)^n = (3/2)^n</div>
        <p class="property-box"><strong>لماذا <span class="math">1^(n-k)</span> موجود؟</strong> إنّ إدخاله يجعل المجموع على الصيغة القياسية للدستور، ما يسهّل التعرف على <span class="math">a</span> و <span class="math">b</span> مباشرة.</p>
        <p><strong>حساب المجموع الثاني <span class="math">B</span>:</strong></p>
        <p>نكتب <span class="math">3^(n-k)/4^k</span> على الشكل <span class="math">3^(n-k) (1/4)^k</span>:</p>
        <div class="math-equation">B = Σ_(k=0)^n C_n^k 3^(n-k) (1/4)^k</div>
        <p>نطبّق دستور ثنائي الحد مع <span class="math">a = 3</span> و <span class="math">b = 1/4</span>:</p>
        <div class="math-equation">B = (3 + 1/4)^n = (13/4)^n</div>
        <p class="property-box"><strong>خلاصة:</strong> كل مجموع يُحسب بإعادة كتابته على صيغة <span class="math">Σ_(k=0)^n C_n^k a^(n-k) b^k</span>، ثمّ استبداله بالمقدار المختصر <span class="math">(a+b)^n</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 3</span>
      <h3>سحب كرات من صندوقين</h3>
      <p>لدينا الصندوقان <span class="math">A</span> و <span class="math">B</span>:</p>
      <ul class="question-list">
        <li>الصندوق <span class="math">A</span> يحتوي 3 كرات حمراء، 3 كرات سوداء، و5 كرات خضراء.</li>
        <li>الصندوق <span class="math">B</span> يحتوي 7 كرات حمراء، كرتين خضراوين، و4 كرات سوداء.</li>
      </ul>
      <p>نسحب كرة من الصندوق <span class="math">A</span> وكرة من الصندوق <span class="math">B</span>.</p>
      <ol class="question-list">
        <li>إذا كانت <span class="math">V</span> حادثة "سحب كرة خضراء من الصندوق A"، احسب <span class="math">p(V)</span>.</li>
        <li>نعتبر الحوادث التالية عند السحب من الصندوق <span class="math">B</span>: <span class="math">N</span> "سحب كرة سوداء"، <span class="math">R</span> "سحب كرة حمراء"، <span class="math">V'</span> "سحب كرة خضراء". احسب <span class="math">p(N)</span> و <span class="math">p(R)</span> و <span class="math">p(V')</span>.</li>
        <li>نسحب كرة من الصندوق <span class="math">A</span> ونضعها في الصندوق <span class="math">B</span>، ثم نسحب كرة من الصندوق <span class="math">B</span>. احسب احتمال سحب كرة خضراء من الصندوق <span class="math">A</span> ثم كرة خضراء من الصندوق <span class="math">B</span>.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${thirdKey}">${thirdOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${thirdOpen ? "open" : ""}" id="solution-${thirdKey}">
        <div class="definition-box">
          <strong>تذكير:</strong> عند سحب كرة عشوائيًا من صندوق، فإن احتمال حادثة <span class="math">E</span> يساوي حاصل قسمة عدد الحالات المتوافقة على عدد كل الحالات الممكنة:
          <div class="math-equation">p(E) = n(E) / n(Ω)</div>
          حيث <span class="math">n(E)</span> عدد الحالات المتوافقة، و <span class="math">n(Ω)</span> عدد كل الحالات الممكنة.
        </div>
        <p><strong>1. احتمال سحب كرة خضراء من الصندوق <span class="math">A</span>:</strong></p>
        <p>عدد الكرات الكلي في <span class="math">A</span> هو <span class="math">3 + 3 + 5 = 11</span>، وعدد الكرات الخضراء هو <span class="math">5</span>. إذن:</p>
        <div class="math-equation">p(V) = 5/11</div>
        <p><strong>2. احتمالات السحب من الصندوق <span class="math">B</span>:</strong></p>
        <p>عدد الكرات الكلي في <span class="math">B</span> هو <span class="math">7 + 2 + 4 = 13</span>. نطبّق القاعدة السابقة على كل حادثة:</p>
        <ul class="question-list">
          <li>الكرات السوداء: <span class="math">4</span> من أصل <span class="math">13</span>، فـ <span class="math">p(N) = 4/13</span>.</li>
          <li>الكرات الحمراء: <span class="math">7</span> من أصل <span class="math">13</span>، فـ <span class="math">p(R) = 7/13</span>.</li>
          <li>الكرات الخضراء: <span class="math">2</span> من أصل <span class="math">13</span>، فـ <span class="math">p(V') = 2/13</span>.</li>
        </ul>
        <div class="math-equation">p(N)=4/13</div>
        <div class="math-equation">p(R)=7/13</div>
        <div class="math-equation">p(V')=2/13</div>
        <p><strong>3. سحب كرة خضراء من <span class="math">A</span> ثم كرة خضراء من <span class="math">B</span>:</strong></p>
        <p>هنا السحبتان <strong>تابعتان</strong>: السحبة الأولى من <span class="math">A</span> تؤثّر في تكوين <span class="math">B</span> قبل السحبة الثانية.</p>
        <p>• احتمال سحب كرة خضراء من <span class="math">A</span> هو <span class="math">p(V) = 5/11</span>.</p>
        <p>• بعد وضع كرة خضراء في <span class="math">B</span>، يصبح عدد الكرات الكلي <span class="math">13 + 1 = 14</span>، ويصبح عدد الكرات الخضراء <span class="math">2 + 1 = 3</span>.</p>
        <p>• احتمال سحب كرة خضراء من <span class="math">B</span> بعد التغيير هو <span class="math">3/14</span>.</p>
        <p>بضرب الاحتمالين (حسب قاعدة الضرب في الاحتمال المركّب):</p>
        <div class="math-equation">p = 5/11 × 3/14 = 15/154</div>
        <p class="property-box"><strong>تدقيق:</strong> <span class="math">5 × 3 = 15</span> و <span class="math">11 × 14 = 154</span>، والكسر <span class="math">15/154</span> غير قابل للاختزال لأن <span class="math">154 = 2 × 7 × 11</span> لا يقبل القسمة على <span class="math">3</span> أو <span class="math">5</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 4</span>
      <h3>قانون ثنائي في 5 محاولات</h3>
      <p>لدينا لعبة حيث احتمال الفشل في كل محاولة هو <span class="math">0.6</span>. نلعب <span class="math">5</span> مرات متتالية، ونعتبر أن المحاولات مستقلة. نرمز بـ <span class="math">X</span> إلى عدد مرات الفوز في المحاولات الخمسة.</p>
      <ol class="question-list">
        <li>حدد قانون الاحتمال الذي يوافق كل 5 محاولات بعدد مرات الفوز.</li>
        <li>أوجد الأمل الرياضي والانحراف المعياري لـ <span class="math">X</span>.</li>
        <li>ما هو احتمال الحادثتين: <span class="math">A</span> "فوز بثلاث في المحاولات الخمسة"، و <span class="math">B</span> "نفوز مرة واحدة على الأقل في المحاولات الخمسة"؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${fourthKey}">${fourthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${fourthOpen ? "open" : ""}" id="solution-${fourthKey}">
        <div class="definition-box">
          <strong>متى نستعمل القانون الثنائي؟</strong> عندما تتكرّر تجربة عشوائية <span class="math">n</span> مرات بشكل مستقل، وفي كل تجربة يكون هناك نتيجتان فقط (نجاح/فشل) مع احتمال نجاح ثابت <span class="math">p</span>. عندئذٍ يتبع عدد النجاحات <span class="math">X</span> قانونًا ثنائيًا يرمز له بـ <span class="math">B(n,p)</span>.
        </div>
        <p><strong>1. تحديد قانون الاحتمال:</strong></p>
        <p>احتمال الفشل هو <span class="math">0.6</span>، إذن احتمال الفوز (النجاح) هو:</p>
        <div class="math-equation">p = 1 - 0.6 = 0.4</div>
        <p>عدد المحاولات <span class="math">n = 5</span>، والمحاولات مستقلة وذات احتمال ثابت. إذن:</p>
        <div class="math-equation">X ~ B(5, 0.4)</div>
        <p>قانون احتمال <span class="math">X</span> هو:</p>
        <div class="math-equation">P(X=k) = C_5^k (0.4)^k (0.6)^(5-k)</div>
        <p class="property-box"><strong>تفسير الصيغة:</strong> <span class="math">C_5^k</span> يمثّل عدد طرق اختيار <span class="math">k</span> محاولات ناجحة من أصل <span class="math">5</span>، و <span class="math">(0.4)^k</span> احتمال تلك النجاحات، و <span class="math">(0.6)^(5-k)</span> احتمال باقي المحاولات الفاشلة.</p>
        <p><strong>2. الأمل الرياضي والانحراف المعياري:</strong></p>
        <p>للقانون الثنائي <span class="math">B(n,p)</span>، الأمل الرياضي والانحراف المعياري يُحسبان بالصيغتين:</p>
        <div class="math-equation">E(X) = np</div>
        <div class="math-equation">σ(X) = √(np(1-p))</div>
        <p>باستبدال <span class="math">n = 5</span> و <span class="math">p = 0.4</span>:</p>
        <div class="math-equation">E(X) = 5 × 0.4 = 2</div>
        <div class="math-equation">σ(X) = √(5 × 0.4 × 0.6) = √1.2 ≈ 1.095</div>
        <p><strong>3. حساب احتمالات الحادثتين <span class="math">A</span> و <span class="math">B</span>:</strong></p>
        <p>احتمال الحادثة <span class="math">A</span>، أي الفوز 3 مرات بالضبط. نضع <span class="math">k = 3</span> في الصيغة:</p>
        <div class="math-equation">P(A) = P(X=3) = C_5^3 (0.4)^3 (0.6)^2</div>
        <p>نحسب <span class="math">C_5^3 = 10</span>، و <span class="math">(0.4)^3 = 0.064</span>، و <span class="math">(0.6)^2 = 0.36</span>:</p>
        <div class="math-equation">P(A) = 10 × 0.064 × 0.36 = 0.2304</div>
        <p>احتمال الحادثة <span class="math">B</span>، أي الفوز مرة واحدة على الأقل. أسهل طريقة هي استعمال الحادثة المضادة: "عدم الفوز في أي محاولة" أي <span class="math">X = 0</span>.</p>
        <div class="math-equation">P(B) = P(X>=1) = 1 - P(X=0)</div>
        <p>نحسب <span class="math">P(X=0)</span>:</p>
        <div class="math-equation">P(X=0) = C_5^0 (0.4)^0 (0.6)^5 = 1 × 1 × 0.07776 = 0.07776</div>
        <p>إذن:</p>
        <div class="math-equation">P(B) = 1 - 0.07776 = 0.92224</div>
        <p class="property-box"><strong>ملاحظة:</strong> الحادثة <span class="math">B</span> تشمل جميع الحالات ما عدا <span class="math">X = 0</span>؛ لذلك نستخدم الطريقة المختصرة عبر المتممة.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 5</span>
      <h3>احتمال شرطي في سحب دون إرجاع</h3>
      <p>يحتوي صندوق على 6 كرات حمراء و3 كرات خضراء لا نفرق بينها عند اللمس. نسحب كرتين على التوالي دون إرجاع.</p>
      <p>لتكن الحادثة <span class="math">A</span>: "الكرة الأولى حمراء"، والحادثة <span class="math">B</span>: "الكرة الثانية خضراء".</p>
      <ol class="question-list">
        <li>احسب <span class="math">p(A)</span>.</li>
        <li>احسب <span class="math">p_A(B)</span>، ثم استنتج <span class="math">p(A∩B)</span>.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${fifthKey}">${fifthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${fifthOpen ? "open" : ""}" id="solution-${fifthKey}">
        <div class="definition-box">
          <strong>تذكير:</strong> الاحتمال الشرطي لحدوث الحادثة <span class="math">B</span> بفرض تحقق الحادثة <span class="math">A</span> يُرمز له بـ <span class="math">p_A(B)</span>، ويُحسب بالعلاقة:
          <div class="math-equation">p_A(B) = p(A∩B) / p(A)</div>
          ومنها نستنتج قاعدة الضرب:
          <div class="math-equation">p(A∩B) = p(A) × p_A(B)</div>
        </div>
        <p><strong>1. حساب <span class="math">p(A)</span>:</strong></p>
        <p>الصندوق يحتوي على <span class="math">6</span> كرات حمراء و <span class="math">3</span> كرات خضراء. إذن عدد الكرات الكلي هو:</p>
        <div class="math-equation">6 + 3 = 9</div>
        <p>الحادثة <span class="math">A</span> هي "الكرة الأولى حمراء"، والكرات الحمراء عددها <span class="math">6</span>. إذن:</p>
        <div class="math-equation">p(A) = 6/9 = 2/3</div>
        <p class="property-box"><strong>تبسيط:</strong> قسّم البسط والمقام على <span class="math">3</span>، فتصبح <span class="math">6/9 = 2/3</span>.</p>
        <p><strong>2. حساب <span class="math">p_A(B)</span> ثم <span class="math">p(A∩B)</span>:</strong></p>
        <p>بما أن السحب يتم <strong>دون إرجاع</strong>، فإن تحقق الحادثة <span class="math">A</span> يغيّر تكوين الصندوق قبل السحبة الثانية:</p>
        <ul class="question-list">
          <li>يبقى في الصندوق <span class="math">9 - 1 = 8</span> كرات.</li>
          <li>عدد الكرات الخضراء لا يتغير، وهو <span class="math">3</span>.</li>
        </ul>
        <p>إذن احتمال أن تكون الكرة الثانية خضراء بفرض أن الأولى حمراء هو:</p>
        <div class="math-equation">p_A(B) = 3/8</div>
        <p>نطبّق الآن قاعدة الضرب للاحتمال الشرطي:</p>
        <div class="math-equation">p(A∩B) = p(A) × p_A(B) = 2/3 × 3/8</div>
        <p>نختزل العامل <span class="math">3</span> في البسط مع <span class="math">3</span> في المقام:</p>
        <div class="math-equation">p(A∩B) = 2/8 = 1/4</div>
        <p class="property-box"><strong>معنى النتيجة:</strong> احتمال سحب كرة حمراء أولًا <strong>و</strong> كرة خضراء ثانيًا (دون إرجاع) هو <span class="math">1/4</span> أي <span class="math">0.25</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 6</span>
      <h3>شجرة احتمالية باستعمال قطعة نقدية وصندوقين</h3>
      <p>نعتبر صندوقين: الصندوق الأول يحتوي 4 كرات بيضاء و3 كرات سوداء، والصندوق الثاني يحتوي كرتين بيضاوين و5 كرات سوداء. الكرات كلها متماثلة ولا نفرق بينها عند اللمس.</p>
      <p>نرمي قطعة نقدية مرة واحدة. إذا ظهر الوجه نسحب عشوائيًا كرة من الصندوق الأول، وإذا لم يظهر الوجه نسحب عشوائيًا كرة من الصندوق الثاني.</p>
      <p>لتكن <span class="math">F</span> الحادثة "ظهور الوجه"، و <span class="math">B</span> الحادثة "الكرة المسحوبة بيضاء".</p>
      <ol class="question-list">
        <li>احسب <span class="math">p(F)</span> و <span class="math">p(F̅)</span>.</li>
        <li>احسب <span class="math">p_F(B)</span> و استنتج <span class="math">p_F(B̅)</span>.</li>
        <li>احسب <span class="math">p_(F̅)(B)</span> و استنتج <span class="math">p_(F̅)(B̅)</span>.</li>
        <li>أكمل الشجرة الاحتمالية بالنتائج المحصل عليها.</li>
      </ol>
      <svg class="probability-tree" viewBox="0 0 520 260" role="img" aria-label="شجرة احتمالية غير مكتملة">
        <defs>
          <marker id="treeArrowBlank" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z"></path>
          </marker>
        </defs>
        <line x1="30" y1="130" x2="185" y2="70"></line>
        <line x1="30" y1="130" x2="185" y2="190"></line>
        <line x1="205" y1="70" x2="380" y2="35"></line>
        <line x1="205" y1="70" x2="380" y2="105"></line>
        <line x1="205" y1="190" x2="380" y2="155"></line>
        <line x1="205" y1="190" x2="380" y2="225"></line>

        <text x="82" y="82" class="tree-prob">p(F)</text>
        <text x="82" y="190" class="tree-prob">p(F̅)</text>
        <text x="258" y="38" class="tree-prob">p_F(B)</text>
        <text x="258" y="112" class="tree-prob">p_F(B̅)</text>
        <text x="248" y="154" class="tree-prob">p_(F̅)(B)</text>
        <text x="248" y="234" class="tree-prob">p_(F̅)(B̅)</text>

        <text x="190" y="74" class="tree-node">F</text>
        <text x="190" y="198" class="tree-node">F̅</text>
        <text x="395" y="39" class="tree-node">B</text>
        <text x="395" y="109" class="tree-node">B̅</text>
        <text x="395" y="159" class="tree-node">B</text>
        <text x="395" y="229" class="tree-node">B̅</text>
      </svg>
      <button class="solution-toggle" type="button" data-solution="${sixthKey}">${sixthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${sixthOpen ? "open" : ""}" id="solution-${sixthKey}">
        <div class="definition-box">
          <strong>تذكير:</strong> هذه التجربة تتمّ على مرحلتين:
          <ul class="question-list">
            <li><strong>المرحلة الأولى:</strong> رمي قطعة نقدية متوازنة؛ النتيجة إمّا ظهور الوجه <span class="math">F</span> أو عدم ظهوره <span class="math">F̅</span>.</li>
            <li><strong>المرحلة الثانية:</strong> إن ظهر <span class="math">F</span> نسحب من الصندوق الأول (4 بيضاء + 3 سوداء)، وإن ظهر <span class="math">F̅</span> نسحب من الصندوق الثاني (2 بيضاء + 5 سوداء).</li>
          </ul>
          لذلك نحتاج إلى احتمالات شرطية: احتمال سحب كرة بيضاء بفرض ظهور كل وجه.
        </div>
        <p><strong>1. احتمالات رمي القطعة النقدية:</strong></p>
        <p>قطعة النقدية متوازنة، إذن احتمال ظهور الوجه يساوي احتمال عدم ظهوره:</p>
        <div class="math-equation">p(F) = 1/2</div>
        <div class="math-equation">p(F̅) = 1 - p(F) = 1/2</div>
        <p><strong>2. إذا ظهر الوجه <span class="math">F</span> (السحب من الصندوق الأول):</strong></p>
        <p>الصندوق الأول يحتوي على <span class="math">4 + 3 = 7</span> كرات، منها <span class="math">4</span> بيضاء. إذن احتمال سحب كرة بيضاء بفرض ظهور الوجه هو:</p>
        <div class="math-equation">p_F(B) = 4/7</div>
        <p>وبما أن الحادثتان "الكرة بيضاء" و"الكرة سوداء" متممتان في الصندوق الأول:</p>
        <div class="math-equation">p_F(B̅) = 1 - p_F(B) = 1 - 4/7 = 3/7</div>
        <p class="property-box"><strong>تدقيق:</strong> عدد الكرات السوداء في الصندوق الأول هو <span class="math">3</span> من أصل <span class="math">7</span>، فـ <span class="math">3/7</span> يتوافق مع النتيجة السابقة.</p>
        <p><strong>3. إذا لم يظهر الوجه <span class="math">F̅</span> (السحب من الصندوق الثاني):</strong></p>
        <p>الصندوق الثاني يحتوي على <span class="math">2 + 5 = 7</span> كرات، منها <span class="math">2</span> بيضاء. إذن:</p>
        <div class="math-equation">p_(F̅)(B) = 2/7</div>
        <p>وباستعمال المتممة:</p>
        <div class="math-equation">p_(F̅)(B̅) = 1 - p_(F̅)(B) = 1 - 2/7 = 5/7</div>
        <p class="property-box"><strong>تدقيق:</strong> عدد الكرات السوداء في الصندوق الثاني هو <span class="math">5</span> من أصل <span class="math">7</span>، فـ <span class="math">5/7</span> يتوافق مع النتيجة السابقة.</p>
        <p><strong>4. إكمال الشجرة الاحتمالية:</strong></p>
        <p>تتشعّب الشجرة من النقطة البداية إلى <span class="math">F</span> و <span class="math">F̅</span> باحتمال <span class="math">1/2</span> لكل منهما. ثم تتشعّب كل فرع إلى <span class="math">B</span> أو <span class="math">B̅</span> بالاحتمالات الشرطية المحسوبة:</p>
        <ul class="question-list">
          <li>فرع <span class="math">F</span>: <span class="math">p_F(B) = 4/7</span> و <span class="math">p_F(B̅) = 3/7</span>.</li>
          <li>فرع <span class="math">F̅</span>: <span class="math">p_(F̅)(B) = 2/7</span> و <span class="math">p_(F̅)(B̅) = 5/7</span>.</li>
        </ul>
        <p>الشجرة الاحتمالية الكاملة:</p>
        <svg class="probability-tree" viewBox="0 0 520 260" role="img" aria-label="شجرة احتمالية">
          <defs>
            <marker id="treeArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z"></path>
            </marker>
          </defs>
          <line x1="30" y1="130" x2="185" y2="70"></line>
          <line x1="30" y1="130" x2="185" y2="190"></line>
          <line x1="205" y1="70" x2="380" y2="35"></line>
          <line x1="205" y1="70" x2="380" y2="105"></line>
          <line x1="205" y1="190" x2="380" y2="155"></line>
          <line x1="205" y1="190" x2="380" y2="225"></line>

          <text x="68" y="82" class="tree-prob">p(F)=1/2</text>
          <text x="68" y="190" class="tree-prob">p(F̅)=1/2</text>
          <text x="248" y="38" class="tree-prob">p_F(B)=4/7</text>
          <text x="248" y="112" class="tree-prob">p_F(B̅)=3/7</text>
          <text x="238" y="154" class="tree-prob">p_(F̅)(B)=2/7</text>
          <text x="238" y="234" class="tree-prob">p_(F̅)(B̅)=5/7</text>

          <text x="190" y="74" class="tree-node">F</text>
          <text x="190" y="198" class="tree-node">F̅</text>
          <text x="395" y="39" class="tree-node">B</text>
          <text x="395" y="109" class="tree-node">B̅</text>
          <text x="395" y="159" class="tree-node">B</text>
          <text x="395" y="229" class="tree-node">B̅</text>
        </svg>
        <p class="property-box"><strong>ملاحظة إضافية:</strong> يمكن حساب احتمال سحب كرة بيضاء بشكل عام (بدون معرفة وجه القطعة) باستعمال قانون الاحتمال الكلي:
          <span class="math">p(B) = p(F) × p_F(B) + p(F̅) × p_(F̅)(B) = 1/2 × 4/7 + 1/2 × 2/7 = 3/7</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 7</span>
      <h3>لعبة ربح وخسارة</h3>
      <p>نلعب لعبة بـ <span class="math">x</span> دينار. نأخذ حجرتي نرد عاديتين ونرميهما. إذا كان مجموع الرقمين الظاهرين هو <span class="math">7</span>، نربح <span class="math">20DA</span>، وإلا لا نربح أي شيء.</p>
      <p>كم يجب على اللاعب أن يدفع في البداية حتى يكون الأمل الرياضي معدومًا؟</p>
      <button class="solution-toggle" type="button" data-solution="${seventhKey}">${seventhOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${seventhOpen ? "open" : ""}" id="solution-${seventhKey}">
        <div class="definition-box">
          <strong>مبدأ المسألة:</strong> لكي يكون الأمل الرياضي للربح الصافي معدومًا، يجب أن يكون متوسط الربح المحتمل مساويًا للصفر. بمعنى آخر، المكاسب المتوقعة تساوي الخسائر المتوقعة على المدى الطويل.
        </div>
        <p><strong>1. تحديد مجال الإمكانات:</strong></p>
        <p>عند رمي حجرتي نرد عاديتين، يمكن لكل حجر أن يعطي إحدى النتائج <span class="math">1,2,3,4,5,6</span>. إذن عدد الأزواج الممكنة هو:</p>
        <div class="math-equation">6 × 6 = 36</div>
        <p>كل زوج له نفس الاحتمال <span class="math">1/36</span>.</p>
        <p><strong>2. حساب احتمال الربح:</strong></p>
        <p>نربح عندما يكون مجموع الرقمين <span class="math">7</span>. الأزواج المؤدية إلى هذا المجموع هي:</p>
        <div class="math-equation">(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)</div>
        <p>عدد هذه الأزواج هو <span class="math">6</span>، لذلك احتمال الربح هو:</p>
        <div class="math-equation">p = 6/36 = 1/6</div>
        <p>واحتمال الخسارة (عدم الحصول على المجموع <span class="math">7</span>) هو:</p>
        <div class="math-equation">1 - p = 1 - 1/6 = 5/6</div>
        <p><strong>3. تحديد الربح الصافي في كل حالة:</strong></p>
        <p>إذا دفع اللاعب <span class="math">x</span> دينارًا في البداية:</p>
        <ul class="question-list">
          <li>عند الفوز: يسترجع <span class="math">x</span> ويحصل على جائزة <span class="math">20</span>، فربحه الصافي هو <span class="math">20 - x</span>.</li>
          <li>عند الخسارة: يخسر المبلغ الذي دفعه، فربحه الصافي هو <span class="math">-x</span>.</li>
        </ul>
        <p><strong>4. حساب الأمل الرياضي:</strong></p>
        <p>نضع الأمل الرياضي للربح الصافي يساوي الصفر:</p>
        <div class="math-equation">E = (20-x) × 1/6 + (-x) × 5/6 = 0</div>
        <p>نبسّط العبارة:</p>
        <div class="math-equation">E = (20-x)/6 - 5x/6 = 0</div>
        <div class="math-equation">(20 - x - 5x) / 6 = 0</div>
        <div class="math-equation">20 - 6x = 0</div>
        <p><strong>5. حل المعادلة:</strong></p>
        <div class="math-equation">6x = 20</div>
        <div class="math-equation">x = 20/6 = 10/3</div>
        <p class="property-box"><strong>النتيجة:</strong> يجب أن يدفع اللاعب في البداية <span class="math">10/3 DA</span>، أي تقريبًا <span class="math">3.33 DA</span>. عند هذا المبلغ، يكون اللعب "عادلًا" من حيث الأمل الرياضي: لا ربح متوقع ولا خسارة متوقعة على المدى الطويل.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 8</span>
      <h3>متغيران عشوائيان من صندوق قصاصات</h3>
      <p>يضم صندوق 3 قصاصات بيضاء تحمل الأرقام 1، 2، 3، وثلاث قصاصات صفراء تحمل الأرقام 1، 2، 3. نسحب عشوائيًا قصاصة واحدة من الصندوق.</p>
      <p>ليكن <span class="math">X</span> المتغير العشوائي الذي يساوي <span class="math">1</span> إذا كانت القصاصة المسحوبة بيضاء، و <span class="math">0</span> إذا لم تكن بيضاء. وليكن <span class="math">Y</span> المتغير العشوائي الذي يساوي رقم القصاصة المسحوبة.</p>
      <ol class="question-list">
        <li>عين قانوني الاحتمال لكل من <span class="math">X</span> و <span class="math">Y</span>.</li>
        <li>احسب الأمل الرياضي لكل من <span class="math">X</span> و <span class="math">Y</span>.</li>
        <li>احسب التباين الرياضي لكل من <span class="math">X</span> و <span class="math">Y</span>.</li>
        <li>عين قانون الاحتمال للمتغير العشوائي <span class="math">XY</span>، ثم احسب أمله الرياضي.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${eighthKey}">${eighthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${eighthOpen ? "open" : ""}" id="solution-${eighthKey}">
        <div class="definition-box">
          <strong>تذكير:</strong> المتغير العشوائي دالة تربط كل نتيجة من تجربة عشوائية بعدد حقيقي. <strong>قانون الاحتمال</strong> للمتغير يعطي احتمال كل قيمة ممكنة. <strong>الأمل الرياضي</strong> هو المتوسط الموزون لهذه القيم، و<strong>التباين</strong> يقيس تشتت القيم حول الأمل.
        </div>
        <p>لدينا في الصندوق <span class="math">6</span> قصاصات موزّعة كما يلي:</p>
        <ul class="question-list">
          <li>قصاصات بيضاء: <span class="math">B1, B2, B3</span> (تحمل الأرقام <span class="math">1,2,3</span>).</li>
          <li>قصاصات صفراء: <span class="math">J1, J2, J3</span> (تحمل الأرقام <span class="math">1,2,3</span>).</li>
        </ul>
        <p>وبما أن السحب عشوائي، فإن كل قصاصة لها نفس الاحتمال <span class="math">1/6</span>.</p>
        <p><strong>1. قانونا الاحتمال لـ <span class="math">X</span> و <span class="math">Y</span>:</strong></p>
        <p>المتغير <span class="math">X</span> يأخذ القيمة <span class="math">1</span> إذا كانت القصاصة بيضاء، و <span class="math">0</span> إذا كانت صفراء. عدد القصاصات البيضاء يساوي عدد الصفراء (<span class="math">3</span> لكل لون):</p>
        <div class="math-equation">p(X=1) = 3/6 = 1/2</div>
        <div class="math-equation">p(X=0) = 3/6 = 1/2</div>
        <p>قانون <span class="math">X</span>:</p>
        <table class="theory-table">
          <thead><tr><th>x</th><th>0</th><th>1</th></tr></thead>
          <tbody><tr><th>p(X=x)</th><td>1/2</td><td>1/2</td></tr></tbody>
        </table>
        <p>المتغير <span class="math">Y</span> يساوي رقم القصاصة. كل رقم <span class="math">1,2,3</span> يظهر مرتين (مرة على قصاصة بيضاء ومرة على صفراء)، لذلك:</p>
        <div class="math-equation">p(Y=1) = p(Y=2) = p(Y=3) = 2/6 = 1/3</div>
        <p>قانون <span class="math">Y</span>:</p>
        <table class="theory-table">
          <thead><tr><th>y</th><th>1</th><th>2</th><th>3</th></tr></thead>
          <tbody><tr><th>p(Y=y)</th><td>1/3</td><td>1/3</td><td>1/3</td></tr></tbody>
        </table>
        <p><strong>2. حساب الأمل الرياضي:</strong></p>
        <p>نستعمل الصيغة العامة <span class="math">E(X) = Σ x_i p(X=x_i)</span>:</p>
        <div class="math-equation">E(X) = 0 × 1/2 + 1 × 1/2 = 1/2</div>
        <div class="math-equation">E(Y) = 1 × 1/3 + 2 × 1/3 + 3 × 1/3 = 6/3 = 2</div>
        <p><strong>3. حساب التباين:</strong></p>
        <p>نستعمل الصيغة <span class="math">Var(X) = E(X^2) - [E(X)]^2</span>. نحسب أولاً <span class="math">E(X^2)</span>:</p>
        <div class="math-equation">E(X^2) = 0^2 × 1/2 + 1^2 × 1/2 = 1/2</div>
        <p>إذن:</p>
        <div class="math-equation">Var(X) = E(X^2) - E(X)^2 = 1/2 - (1/2)^2 = 1/2 - 1/4 = 1/4</div>
        <p>وبنفس الطريقة لـ <span class="math">Y</span>:</p>
        <div class="math-equation">E(Y^2) = 1^2 × 1/3 + 2^2 × 1/3 + 3^2 × 1/3 = 14/3</div>
        <div class="math-equation">Var(Y) = E(Y^2) - E(Y)^2 = 14/3 - 2^2 = 14/3 - 4 = 2/3</div>
        <p><strong>4. قانون الاحتمال لـ <span class="math">XY</span>:</strong></p>
        <p>حاصل الضرب <span class="math">XY</span> يعني:</p>
        <ul class="question-list">
          <li>إذا كانت القصاصة صفراء (<span class="math">X=0</span>)، فـ <span class="math">XY = 0 × Y = 0</span>.</li>
          <li>إذا كانت القصاصة بيضاء (<span class="math">X=1</span>)، فـ <span class="math">XY = 1 × Y = Y</span>، أي الرقم المكتوب عليها.</li>
        </ul>
        <p>إذن:</p>
        <div class="math-equation">p(XY=0) = p(X=0) = 1/2</div>
        <div class="math-equation">p(XY=1) = p(B1) = 1/6</div>
        <div class="math-equation">p(XY=2) = p(B2) = 1/6</div>
        <div class="math-equation">p(XY=3) = p(B3) = 1/6</div>
        <p>قانون <span class="math">XY</span>:</p>
        <table class="theory-table">
          <thead><tr><th>z</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead>
          <tbody><tr><th>p(XY=z)</th><td>1/2</td><td>1/6</td><td>1/6</td><td>1/6</td></tr></tbody>
        </table>
        <p>الأمل الرياضي لـ <span class="math">XY</span>:</p>
        <div class="math-equation">E(XY) = 0 × 1/2 + 1 × 1/6 + 2 × 1/6 + 3 × 1/6 = 6/6 = 1</div>
        <p class="property-box"><strong>ملاحظة:</strong> يمكن ملاحظة أن <span class="math">E(XY) = 1</span> بينما <span class="math">E(X) × E(Y) = 1/2 × 2 = 1</span>. في هذه الحالة يتساويان، لكن هذا لا يعني دائمًا أن <span class="math">X</span> و <span class="math">Y</span> مستقلّان؛ الاستقلال يتطلّب تحقق <span class="math">p(X=x, Y=y) = p(X=x) × p(Y=y)</span> لكل القيم.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 9</span>
      <h3>قانون احتمال علامة في رمية نرد</h3>
      <p>نرمي نردًا مرة واحدة، ولتكن <span class="math">X</span> العلامة التي تحدد كما يلي:</p>
      <ul class="question-list">
        <li>العلامة <span class="math">-10</span> إذا ظهر الرقم <span class="math">1</span>.</li>
        <li>العلامة <span class="math">10</span> إذا ظهر أحد الرقمين <span class="math">6</span> أو <span class="math">5</span>.</li>
        <li>العلامة <span class="math">0</span> في الحالات الأخرى.</li>
      </ul>
      <p>احتمالات ظهور الأوجه <span class="math">1,2,3,4,5,6</span> على الترتيب هي: <span class="math">0.12</span>، <span class="math">0.12</span>، <span class="math">0.12</span>، <span class="math">0.12</span>، <span class="math">0.26</span>، <span class="math">0.26</span>.</p>
      <p>عرّف قانون الاحتمال للمتغير العشوائي <span class="math">X</span>، ثم احسب أمله الرياضي.</p>
      <button class="solution-toggle" type="button" data-solution="${ninthKey}">${ninthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${ninthOpen ? "open" : ""}" id="solution-${ninthKey}">
        <p>القيم الممكنة للمتغير العشوائي <span class="math">X</span> هي <span class="math">-10</span> و <span class="math">0</span> و <span class="math">10</span>.</p>
        <p>نحسب الاحتمالات:</p>
        <div class="math-equation">p(X=-10)=p(1)=0.12</div>
        <div class="math-equation">p(X=10)=p(5)+p(6)=0.26+0.26=0.52</div>
        <div class="math-equation">p(X=0)=p(2)+p(3)+p(4)=0.12+0.12+0.12=0.36</div>
        <table class="theory-table">
          <thead><tr><th>x</th><th>-10</th><th>0</th><th>10</th></tr></thead>
          <tbody><tr><th>p(X=x)</th><td>0.12</td><td>0.36</td><td>0.52</td></tr></tbody>
        </table>
        <p>الأمل الرياضي:</p>
        <div class="math-equation">E(X)=(-10)×0.12+0×0.36+10×0.52=4</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 10</span>
      <h3>اختيار تلميذين ومسؤولين</h3>
      <ol class="question-list">
        <li>بكم طريقة يمكن اختيار طالبين من 26 تلميذ؟</li>
        <li>بكم طريقة يمكن اختيار مسؤول منهم ونائب له؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${thirteenthKey}">${thirteenthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${thirteenthOpen ? "open" : ""}" id="solution-${thirteenthKey}">
        <p>1. اختيار طالبين فقط يعني أن الترتيب لا يهم، لذلك نستعمل التوفيقات:</p>
        <div class="math-equation">C_26^2 = 26×25/2 = 325</div>
        <p>2. اختيار مسؤول ونائب له يعني أن الترتيب أو المنصب مهم، لذلك نستعمل الترتيبات:</p>
        <div class="math-equation">A_26^2 = 26×25 = 650</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 11</span>
      <h3>لعبة اللوتو</h3>
      <p>في الرهان الرياضي المسمى "لوتو"، يختار المشترك 6 أرقام من بين 49، حيث إن الأرقام مرقمة من 1 إلى 49.</p>
      <ol class="question-list">
        <li>ما عدد الاختيارات الممكنة؟</li>
        <li>ما احتمال أن يحالفك الحظ لتفوز بالمرتبة الأولى، وهي سحب 6 أرقام صحيحة؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${fourteenthKey}">${fourteenthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${fourteenthOpen ? "open" : ""}" id="solution-${fourteenthKey}">
        <p>اختيار 6 أرقام من بين 49 لا يهم فيه الترتيب، لذلك نستعمل التوفيقات:</p>
        <div class="math-equation">C_49^6 = 49!/(6!43!) = 13983816</div>
        <p>يوجد اختيار واحد فقط رابح للمرتبة الأولى من بين كل الاختيارات الممكنة، لذلك:</p>
        <div class="math-equation">p = 1/C_49^6 = 1/13983816</div>
        <p>أي تقريبًا:</p>
        <div class="math-equation">p ≈ 0.0000000715</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 12</span>
      <h3>صندوق فيه كرات سوداء وبيضاء</h3>
      <p>يضم صندوق <span class="math">10</span> كرات متماثلة، منها <span class="math">4</span> سوداء و <span class="math">n</span> بيضاء. نسحب من الصندوق <span class="math">3</span> كرات في آن واحد.</p>
      <ol class="question-list">
        <li>ما عدد الحالات الممكنة للحصول على: أ) 3 كرات بيضاء؟ ب) كرة بيضاء على الأقل؟ ج) 3 كرات ليست من نفس اللون؟</li>
        <li>احسب العدد <span class="math">X_n</span> للحالات الممكنة لسحب <span class="math">3</span> كرات من نفس اللون.</li>
        <li>بيّن أن <span class="math">X_n = n^2 + 9n + 21</span> من أجل كل <span class="math">n</span> طبيعي غير معدوم.</li>
        <li>ثم عيّن قيمة <span class="math">n</span> حتى يكون <span class="math">X_n = 10713</span>.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${twelfthKey}">${twelfthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${twelfthOpen ? "open" : ""}" id="solution-${twelfthKey}">
        <p>عدد الكرات الكلي هو <span class="math">n+4</span>.</p>
        <p>أ) عدد حالات الحصول على 3 كرات بيضاء هو:</p>
        <div class="math-equation">C_n^3 = n(n-1)(n-2)/6</div>
        <p>ب) عدد حالات الحصول على كرة بيضاء على الأقل هو كل السحبات ناقص حالة سحب 3 كرات سوداء:</p>
        <div class="math-equation">C_(n+4)^3 - C_4^3</div>
        <p>ج) ثلاث كرات ليست من نفس اللون يعني ليست كلها بيضاء وليست كلها سوداء:</p>
        <div class="math-equation">C_(n+4)^3 - C_n^3 - C_4^3</div>
        <p>عدد حالات سحب 3 كرات من نفس اللون هو:</p>
        <div class="math-equation">X_n = C_n^3 + C_4^3</div>
        <p>وبالتطوير:</p>
        <div class="math-equation">X_n = n(n-1)(n-2)/6 + 4</div>
        <p>أما إذا كان المقصود في نص الصورة هو الصيغة المعطاة <span class="math">X_n=n^2+9n+21</span> فنحل المعادلة المطلوبة مباشرة:</p>
        <div class="math-equation">n^2+9n+21=10713</div>
        <div class="math-equation">n^2+9n-10692=0</div>
        <p>المميز:</p>
        <div class="math-equation">Δ=9^2+4×10692=42849=207^2</div>
        <div class="math-equation">n=(-9+207)/2=99</div>
        <p>إذن القيمة المطلوبة هي <span class="math">n=99</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 13</span>
      <h3>سحب 3 كرات من صندوق ملون ومرقم</h3>
      <p>يضم صندوق 15 كرية، منها 5 بيضاء تحمل الأرقام: 1، 1، 2، 3، 6، و4 حمراء تحمل الأرقام: 1، 1، 2، 2، و6 خضراء تحمل الأرقام: 1، 1، 2، 3، 3، 3.</p>
      <p>نسحب 3 كرات في آن واحد. ما عدد الحالات الممكنة لسحب:</p>
      <ol class="question-list">
        <li>3 كرات من نفس اللون؟</li>
        <li>3 كرات تحمل نفس الرقم؟</li>
        <li>3 كرات مجموع أرقامها 9؟</li>
        <li>3 كرات واحدة على الأقل منها تحمل رقمًا فرديًا؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${newThirteenthKey}">${newThirteenthOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${newThirteenthOpen ? "open" : ""}" id="solution-${newThirteenthKey}">
        <p>عدد الحالات الكلية هو:</p>
        <div class="math-equation">C_15^3 = 455</div>
        <p>1. ثلاث كرات من نفس اللون:</p>
        <div class="math-equation">C_5^3 + C_4^3 + C_6^3 = 10 + 4 + 20 = 34</div>
        <p>2. ثلاث كرات تحمل نفس الرقم. عدد الكرات حسب الرقم هو: الرقم 1: ست كرات، الرقم 2: أربع كرات، الرقم 3: أربع كرات، الرقم 6: كرة واحدة.</p>
        <div class="math-equation">C_6^3 + C_4^3 + C_4^3 = 20 + 4 + 4 = 28</div>
        <p>3. ثلاث كرات مجموع أرقامها 9. الحالات الممكنة للأرقام هي: 1 و2 و6، أو 3 و3 و3.</p>
        <div class="math-equation">6×4×1 + C_4^3 = 24 + 4 = 28</div>
        <p>4. ثلاث كرات واحدة على الأقل منها تحمل رقمًا فرديًا. نستعمل المتممة: لا يوجد أي رقم فردي، أي كلها أرقام زوجية. عدد الكرات ذات الأرقام الزوجية هو 5.</p>
        <div class="math-equation">C_15^3 - C_5^3 = 455 - 10 = 445</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 14</span>
      <h3>ترتيب حروف كلمات</h3>
      <p>في كل حالة من الحالات التالية، احسب عدد الكلمات التي يمكن تشكيلها من حروف الكلمة المعطاة، سواء كان لها معنى أو لم يكن لها معنى.</p>
      <ol class="question-list">
        <li><span class="math">n = 3</span> والكلمة هي: "علم".</li>
        <li><span class="math">n = 5</span> والكلمة هي: "عنصر".</li>
        <li><span class="math">n = 5</span> والكلمة هي: "عينين".</li>
        <li><span class="math">n = 6</span> والكلمة هي: "فلسطين".</li>
        <li><span class="math">n = 6</span> والكلمة هي: "سلسيل" كما تظهر في الصورة.</li>
        <li>يتنافس <span class="math">10</span> لاعبين في دورة التنس الوطنية. ما عدد الترتيبات الممكنة لهم؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${wordArrangementsKey}">${wordArrangementsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${wordArrangementsOpen ? "open" : ""}" id="solution-${wordArrangementsKey}">
        <div class="definition-box">
          <strong>قاعدة:</strong> إذا كانت كل الحروف مختلفة فعدد الترتيبات هو <span class="math">n!</span>. وإذا تكرر حرف أو أكثر، نقسم على مضروب عدد مرات تكرار كل حرف.
        </div>
        <p>1. كلمة "علم" تتكون من 3 حروف مختلفة، إذن:</p>
        <div class="math-equation">3! = 3×2×1 = 6</div>
        <p>2. كلمة "عنصر" تتكون من 5 حروف مختلفة، إذن:</p>
        <div class="math-equation">5! = 120</div>
        <p>3. كلمة "عينين" تتكون من 5 حروف، وفيها الحرف "ي" مكرر مرتين والحرف "ن" مكرر مرتين، لذلك:</p>
        <div class="math-equation">5!/(2!×2!) = 120/4 = 30</div>
        <p>4. كلمة "فلسطين" حسب المعطى <span class="math">n=6</span> وحروفها مختلفة، لذلك:</p>
        <div class="math-equation">6! = 720</div>
        <p>5. الكلمة الأخيرة غير واضحة تمامًا في الصورة. إذا اعتمدنا المعطى <span class="math">n=6</span> مع وجود حرفين مكررين مرتين، فإن عدد الترتيبات هو:</p>
        <div class="math-equation">6!/(2!×2!) = 720/4 = 180</div>
        <p>أما إذا كان فيها حرف واحد فقط مكرر مرتين، فيكون العدد:</p>
        <div class="math-equation">6!/2! = 360</div>
        <p>6. ترتيب 10 لاعبين في دورة التنس الوطنية يعني أن ترتيب اللاعبين مهم، لذلك:</p>
        <div class="math-equation">10! = 3628800</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 15</span>
      <h3>تنظيم كتب وسحب كرات</h3>
      <p>في أحد رفوف المكتبة نريد تنظيم 4 كتب إسلامية، و3 كتب علمية، و5 كتب رياضيات.</p>
      <ol class="question-list">
        <li>إذا كانت الكتب مميزة وكلها توضع في رف واحد، ما عدد الحالات الممكنة؟</li>
        <li>إذا كان على التوالي أن تكون كتب كل موضوع متجاورة، ما عدد الحالات الممكنة؟</li>
        <li>إذا كان على التوالي مع الإبقاء على أن لا يوجد كتابان من نفس الموضوع متجاورين، ما عدد الاختيارات الممكنة؟</li>
      </ol>
      <p>وفي صندوق يحتوي 49 كرية مرقمة من 1 إلى 49، منها 6 كرات حمراء والباقي بيضاء. نسحب في آن واحد 6 كرات.</p>
      <ol class="question-list">
        <li>ما عدد الطرق الممكنة للحصول على 3 كرات بيضاء و3 كرات حمراء؟</li>
        <li>قارن بين عدد الطرق التي لا نحصل فيها على كرات حمراء وعدد الطرق التي نحصل فيها على كرة حمراء على الأقل.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${booksAndBallsKey}">${booksAndBallsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${booksAndBallsOpen ? "open" : ""}" id="solution-${booksAndBallsKey}">
        <p><strong>أولا: تنظيم الكتب</strong></p>
        <p>عدد الكتب الكلي هو:</p>
        <div class="math-equation">4 + 3 + 5 = 12</div>
        <p>1. بما أن كل الكتب مميزة والترتيب مهم، فإن عدد الحالات الممكنة هو:</p>
        <div class="math-equation">12! = 479001600</div>
        <p>2. إذا اشترطنا أن تبقى كتب كل موضوع متجاورة، نعد كل موضوع ككتلة واحدة: كتلة إسلامية، كتلة علمية، كتلة رياضيات. ترتب الكتل بثلاث طرق، ثم ترتب الكتب داخل كل كتلة:</p>
        <div class="math-equation">3! × 4! × 3! × 5! = 103680</div>
        <p>3. إذا اشترطنا ألا يتجاور كتابان من نفس الموضوع، نرتب أولا مواضيع الكتب فقط: 4 من النوع الأول، 3 من النوع الثاني، 5 من النوع الثالث، دون تكرار نفس الموضوع في موضعين متتالين.</p>
        <p>عدد تسلسلات المواضيع الموافقة هو <span class="math">588</span>. وبعد ذلك نرتب الكتب داخل كل موضوع:</p>
        <div class="math-equation">588 × 4! × 3! × 5! = 10160640</div>
        <p><strong>ثانيا: سحب الكرات</strong></p>
        <p>عدد الكرات الحمراء هو <span class="math">6</span>، وعدد الكرات البيضاء هو:</p>
        <div class="math-equation">49 - 6 = 43</div>
        <p>1. للحصول على 3 كرات بيضاء و3 كرات حمراء نختار 3 من البيضاء و3 من الحمراء:</p>
        <div class="math-equation">C_43^3 × C_6^3 = 12341 × 20 = 246820</div>
        <p>2. عدد الطرق التي لا نحصل فيها على أي كرة حمراء هو اختيار الكرات الست كلها من البيضاء:</p>
        <div class="math-equation">C_43^6 = 6096454</div>
        <p>وعدد الطرق التي نحصل فيها على كرة حمراء على الأقل هو المتممة:</p>
        <div class="math-equation">C_49^6 - C_43^6 = 13983816 - 6096454 = 7887362</div>
        <p class="property-box"><strong>المقارنة:</strong> عدد الطرق التي نحصل فيها على كرة حمراء على الأقل أكبر من عدد الطرق التي لا نحصل فيها على أي كرة حمراء.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 16</span>
      <h3>أرقام الهواتف</h3>
      <p>يتكون رقم الهاتف من 5 أرقام، الرقم الأول من 1 إلى 9، والأرقام الموالية اختيارية من 0 إلى 9.</p>
      <ol class="question-list">
        <li>ما عدد أرقام الهواتف الممكنة؟</li>
        <li>ما عدد أرقام الهواتف التي تضم:
          <br>أ) ثلاث مرات الرقم 1؟
          <br>ب) على الأقل مرتين الرقم 1؟
          <br>ج) مرتين الرقم 5 ومرة واحدة الرقم 2؟
          <br>د) 5 أرقام زوجية فقط؟
        </li>
        <li>ما عدد أرقام الهواتف التي لا تضم الرقمين 6 و9؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${phoneNumbersKey}">${phoneNumbersOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${phoneNumbersOpen ? "open" : ""}" id="solution-${phoneNumbersKey}">
        <p>1. الرقم الأول له <span class="math">9</span> اختيارات، وكل رقم من الأرقام الأربعة الباقية له <span class="math">10</span> اختيارات:</p>
        <div class="math-equation">9 × 10^4 = 90000</div>
        <p>2. أ) ثلاث مرات الرقم <span class="math">1</span> بالضبط:</p>
        <p>إذا كان الرقم الأول هو <span class="math">1</span>، نختار موضعين آخرين للرقم <span class="math">1</span> من بين 4 مواضع، والباقي ليس 1:</p>
        <div class="math-equation">C_4^2 × 9^2 = 6 × 81 = 486</div>
        <p>وإذا لم يكن الرقم الأول هو <span class="math">1</span>، نختار 3 مواضع للرقم <span class="math">1</span> من المواضع الأربعة الأخيرة، والرقم الأول له 8 اختيارات، والموضع الباقي له 9 اختيارات:</p>
        <div class="math-equation">C_4^3 × 8 × 9 = 4 × 72 = 288</div>
        <div class="math-equation">486 + 288 = 774</div>
        <p>ب) على الأقل مرتين الرقم <span class="math">1</span>. نستعمل المتممة: كل الأرقام ناقص لا يوجد 1 ناقص يوجد 1 مرة واحدة فقط.</p>
        <div class="math-equation">لا يوجد 1: 8 × 9^4 = 52488</div>
        <div class="math-equation">يوجد 1 مرة واحدة: 9^4 + 4 × 8 × 9^3 = 29889</div>
        <div class="math-equation">90000 - 52488 - 29889 = 7623</div>
        <p>ج) مرتين الرقم <span class="math">5</span> ومرة واحدة الرقم <span class="math">2</span> بالضبط:</p>
        <div class="math-equation">768 + 384 + 672 = 1824</div>
        <p>حيث الحالات الثلاث هي: البداية بـ 5، أو البداية بـ 2، أو البداية برقم آخر غير 2 و5.</p>
        <p>د) خمسة أرقام زوجية فقط. الرقم الأول الزوجي غير الصفري له 4 اختيارات: <span class="math">2,4,6,8</span>، وكل رقم بعده له 5 اختيارات: <span class="math">0,2,4,6,8</span>.</p>
        <div class="math-equation">4 × 5^4 = 2500</div>
        <p>3. إذا كان الرقم لا يضم الرقمين <span class="math">6</span> و<span class="math">9</span>، فالرقم الأول له 7 اختيارات، والأرقام الأربعة الباقية لكل منها 8 اختيارات:</p>
        <div class="math-equation">7 × 8^4 = 28672</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 17</span>
      <h3>تلوين أضلاع مثلث</h3>
      <p>نريد تلوين كل ضلع من أضلاع مثلث بلون من ثلاثة ألوان: أخضر، أحمر، أو أصفر، بشرط أن يكون اللونان المختاران لضلعين مشتركين في رأس مختلفين.</p>
      <div class="activity-visual">
        <svg viewBox="0 0 220 150" role="img" aria-label="مثلث لتلوين أضلاعه">
          <polygon points="110,18 28,128 192,128" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linejoin="round"/>
          <circle cx="110" cy="18" r="5" fill="var(--accent-2)"/>
          <circle cx="28" cy="128" r="5" fill="var(--accent-2)"/>
          <circle cx="192" cy="128" r="5" fill="var(--accent-2)"/>
        </svg>
      </div>
      <p>ما عدد الكيفيات الممكنة للتلوين؟</p>
      <button class="solution-toggle" type="button" data-solution="${triangleColoringKey}">${triangleColoringOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${triangleColoringOpen ? "open" : ""}" id="solution-${triangleColoringKey}">
        <p>في المثلث كل ضلعين يشتركان في رأس، لذلك الشرط يعني أن الأضلاع الثلاثة يجب أن تكون بألوان مختلفة.</p>
        <p>نلوّن الضلع الأول: له <span class="math">3</span> اختيارات.</p>
        <p>نلوّن الضلع الثاني: يجب أن يختلف عن الأول، إذن له <span class="math">2</span> اختياران.</p>
        <p>نلوّن الضلع الثالث: يجب أن يختلف عن الضلعين السابقين، إذن يبقى له <span class="math">1</span> اختيار.</p>
        <div class="math-equation">3 × 2 × 1 = 6</div>
        <p class="property-box"><strong>النتيجة:</strong> عدد الكيفيات الممكنة للتلوين هو <span class="math">6</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 18</span>
      <h3>تشكيل لجنة من أطباء وطبيبات</h3>
      <p>يتكون قسم مختلط من 18 طبيبًا و12 طبيبة. نريد تشكيل لجنة تتكون من رئيس ونائب وأمين.</p>
      <ol class="question-list">
        <li>ما عدد اللجان التي يمكن تشكيلها؟</li>
        <li>ما عدد اللجان التي يمكن تشكيلها بحيث:
          <br>أ) يكون الأمين طبيبة؟
          <br>ب) الطبيب <span class="math">X</span> لا يوجد في اللجنة؟
          <br>ج) يكون الرئيس طبيبًا والأمين طبيبة؟
          <br>د) الرئيس ونائبه من جنسين مختلفين؟
        </li>
        <li>فرض أن الرئيس طبيب، والأمين طبيبة، وأن الطبيب <span class="math">X</span> لا يريد الانضمام إلى لجنة تضم الطبيبة <span class="math">Y</span>. ما عدد اللجان التي يمكن تشكيلها في هذه الظروف؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${committeeDoctorsKey}">${committeeDoctorsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${committeeDoctorsOpen ? "open" : ""}" id="solution-${committeeDoctorsKey}">
        <p>عدد الأشخاص الكلي هو:</p>
        <div class="math-equation">18 + 12 = 30</div>
        <p>بما أن المناصب مختلفة: رئيس، نائب، أمين، فإن الترتيب مهم.</p>
        <p>1. عدد اللجان دون شرط:</p>
        <div class="math-equation">A_30^3 = 30 × 29 × 28 = 24360</div>
        <p>2. أ) إذا كان الأمين طبيبة: نختار الأمين من 12 طبيبة، ثم نختار الرئيس والنائب من الباقين بالترتيب:</p>
        <div class="math-equation">12 × 29 × 28 = 9744</div>
        <p>ب) إذا كان الطبيب <span class="math">X</span> غير موجود في اللجنة، يبقى 29 شخصًا:</p>
        <div class="math-equation">A_29^3 = 29 × 28 × 27 = 21924</div>
        <p>ج) إذا كان الرئيس طبيبًا والأمين طبيبة، فنختار الرئيس من 18 طبيبًا، والأمين من 12 طبيبة، ثم النائب من الباقين:</p>
        <div class="math-equation">18 × 12 × 28 = 6048</div>
        <p>د) إذا كان الرئيس ونائبه من جنسين مختلفين، فإما الرئيس طبيب والنائب طبيبة، أو الرئيس طبيبة والنائب طبيب. بعد ذلك نختار الأمين من الباقين:</p>
        <div class="math-equation">(18 × 12 + 12 × 18) × 28 = 12096</div>
        <p>3. نبدأ من عدد اللجان التي يكون فيها الرئيس طبيبًا والأمين طبيبة:</p>
        <div class="math-equation">18 × 12 × 28 = 6048</div>
        <p>ثم نحذف اللجان التي تضم الطبيب <span class="math">X</span> والطبيبة <span class="math">Y</span> معًا.</p>
        <ul class="question-list">
          <li>إذا كان <span class="math">X</span> رئيسًا و<span class="math">Y</span> أمينة: للنائب 28 اختيارًا.</li>
          <li>إذا كان <span class="math">X</span> رئيسًا و<span class="math">Y</span> نائبة: للأمين 11 اختيارًا من الطبيبات غير <span class="math">Y</span>.</li>
          <li>إذا كان <span class="math">X</span> نائبًا و<span class="math">Y</span> أمينة: للرئيس 17 اختيارًا من الأطباء غير <span class="math">X</span>.</li>
        </ul>
        <div class="math-equation">28 + 11 + 17 = 56</div>
        <div class="math-equation">6048 - 56 = 5992</div>
        <p class="property-box"><strong>النتيجة:</strong> عدد اللجان في هذه الظروف هو <span class="math">5992</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 19</span>
      <h3>نهاية العنكبوت</h3>
      <p>الشكل التالي يمثل شبكة تتحرك عليها عنكبوت، ولا يمكنها التنقل إلا إلى اليمين أو إلى الأعلى.</p>
      <div class="activity-visual">
        <svg viewBox="0 0 300 260" role="img" aria-label="شبكة مسارات العنكبوت">
          <rect x="48" y="28" width="180" height="216" fill="#35ef35" stroke="#0d1b1e" stroke-width="2"/>
          ${Array.from({ length: 6 }, (_, i) => `<line x1="${48 + i * 36}" y1="28" x2="${48 + i * 36}" y2="244" stroke="#0d1b1e" stroke-width="1.4"/>`).join("")}
          ${Array.from({ length: 7 }, (_, i) => `<line x1="48" y1="${28 + i * 36}" x2="228" y2="${28 + i * 36}" stroke="#0d1b1e" stroke-width="1.4"/>`).join("")}
          <defs>
            <marker id="spider-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#0f172a"/>
            </marker>
          </defs>
          <line x1="48" y1="244" x2="88" y2="244" stroke="#0f172a" stroke-width="2" marker-end="url(#spider-arrow)"/>
          <line x1="48" y1="244" x2="48" y2="204" stroke="#0f172a" stroke-width="2" marker-end="url(#spider-arrow)"/>
          <circle cx="48" cy="244" r="5" fill="#111827"/>
          <circle cx="120" cy="172" r="5" fill="#111827"/>
          <circle cx="192" cy="100" r="5" fill="#111827"/>
          <circle cx="228" cy="28" r="5" fill="#111827"/>
          <text x="32" y="258" font-size="18" fill="#111827" font-style="italic">O</text>
          <text x="78" y="258" font-size="18" fill="#111827" font-style="italic">i</text>
          <text x="30" y="218" font-size="18" fill="#111827" font-style="italic">j</text>
          <text x="105" y="166" font-size="18" fill="#111827" font-style="italic">A</text>
          <text x="176" y="94" font-size="18" fill="#111827" font-style="italic">B</text>
          <text x="216" y="22" font-size="18" fill="#111827" font-style="italic">C</text>
        </svg>
      </div>
      <ol class="question-list">
        <li>ما عدد المسارات التي يمكن أن تسلكها العنكبوت للوصول إلى الحجرة <span class="math">C</span>؟</li>
        <li>ما عدد المسارات إذا أرادت العنكبوت المرور بالحجرة <span class="math">B</span>؟</li>
        <li>ما عدد المسارات إذا أرادت العنكبوت المرور بالحجرة <span class="math">A</span>؟</li>
        <li>ما عدد المسارات إذا أرادت العنكبوت الانتقال من الحجرة <span class="math">A</span> إلى الحجرة <span class="math">C</span> فقط؟</li>
        <li>ما عدد المسارات إذا أرادت العنكبوت الوصول إلى الحجرة <span class="math">C</span> بعد المرور بكل من <span class="math">A</span> و<span class="math">B</span> على الترتيب؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${spiderPathsKey}">${spiderPathsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${spiderPathsOpen ? "open" : ""}" id="solution-${spiderPathsKey}">
        <div class="definition-box">
          <strong>قاعدة:</strong> للانتقال من نقطة إلى أخرى باستعمال خطوات نحو اليمين وخطوات نحو الأعلى فقط، إذا احتجنا <span class="math">a</span> خطوات يمينًا و<span class="math">b</span> خطوات أعلى، فإن عدد المسارات هو <span class="math">C_(a+b)^a = C_(a+b)^b</span>.
        </div>
        <p>من الرسم نأخذ الإحداثيات: <span class="math">A(2,2)</span>، <span class="math">B(4,4)</span>، <span class="math">C(5,6)</span>.</p>
        <p>1. من <span class="math">O</span> إلى <span class="math">C</span>: نحتاج 5 خطوات يمينًا و6 خطوات أعلى:</p>
        <div class="math-equation">C_11^5 = 462</div>
        <p>2. المرور بالحجرة <span class="math">B</span>: نحسب من <span class="math">O</span> إلى <span class="math">B</span> ثم من <span class="math">B</span> إلى <span class="math">C</span>:</p>
        <div class="math-equation">C_8^4 × C_3^1 = 70 × 3 = 210</div>
        <p>3. المرور بالحجرة <span class="math">A</span>: نحسب من <span class="math">O</span> إلى <span class="math">A</span> ثم من <span class="math">A</span> إلى <span class="math">C</span>:</p>
        <div class="math-equation">C_4^2 × C_7^3 = 6 × 35 = 210</div>
        <p>4. من <span class="math">A</span> إلى <span class="math">C</span> فقط: نحتاج 3 خطوات يمينًا و4 خطوات أعلى:</p>
        <div class="math-equation">C_7^3 = 35</div>
        <p>5. المرور بـ <span class="math">A</span> ثم <span class="math">B</span> ثم الوصول إلى <span class="math">C</span>:</p>
        <div class="math-equation">C_4^2 × C_4^2 × C_3^1 = 6 × 6 × 3 = 108</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 20</span>
      <h3>معادلات باستعمال التوافيق</h3>
      <p>أوجد العدد الطبيعي <span class="math">n</span> في كل حالة من الحالات التالية:</p>
      <ol class="question-list">
        <li><span class="math">C_n^3 = 56</span></li>
        <li><span class="math">9C_n^2 = 2C_n^3</span></li>
        <li><span class="math">C_n^3 + C_n^2 = 8n</span></li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${combinationsEquationsKey}">${combinationsEquationsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${combinationsEquationsOpen ? "open" : ""}" id="solution-${combinationsEquationsKey}">
        <p>1. لدينا:</p>
        <div class="math-equation">C_n^3 = n(n-1)(n-2)/6 = 56</div>
        <div class="math-equation">n(n-1)(n-2)=336</div>
        <p>نجرب القيم المتتالية، فنجد:</p>
        <div class="math-equation">C_8^3 = 8×7×6/6 = 56</div>
        <p class="property-box"><strong>إذن:</strong> <span class="math">n = 8</span>.</p>
        <p>2. نستعمل العلاقة:</p>
        <div class="math-equation">C_n^2 = n(n-1)/2</div>
        <div class="math-equation">C_n^3 = n(n-1)(n-2)/6</div>
        <p>بالتعويض في المعادلة:</p>
        <div class="math-equation">9 × n(n-1)/2 = 2 × n(n-1)(n-2)/6</div>
        <p>ولأن <span class="math">n ≥ 3</span>، نقسم على <span class="math">n(n-1)</span>:</p>
        <div class="math-equation">9/2 = (n-2)/3</div>
        <div class="math-equation">27 = 2n - 4</div>
        <div class="math-equation">n = 31/2</div>
        <p class="property-box"><strong>إذن:</strong> لا يوجد عدد طبيعي <span class="math">n</span> يحقق هذه العلاقة كما هي مكتوبة في الصورة.</p>
        <p>3. لدينا:</p>
        <div class="math-equation">C_n^3 + C_n^2 = n(n-1)(n-2)/6 + n(n-1)/2</div>
        <p>نوحد المقام:</p>
        <div class="math-equation">C_n^3 + C_n^2 = n(n-1)(n-2+3)/6 = n(n-1)(n+1)/6</div>
        <p>نعوض في المعادلة:</p>
        <div class="math-equation">n(n-1)(n+1)/6 = 8n</div>
        <p>وبما أن <span class="math">n</span> عدد طبيعي غير معدوم، نقسم على <span class="math">n</span>:</p>
        <div class="math-equation">(n-1)(n+1)=48</div>
        <div class="math-equation">n^2 - 1 = 48</div>
        <div class="math-equation">n^2 = 49</div>
        <p class="property-box"><strong>إذن:</strong> <span class="math">n = 7</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 21</span>
      <h3>دستور ثنائي الحد بالتراجع</h3>
      <p>1. بيّن بالتراجع أنه من أجل كل عدد طبيعي <span class="math">n ≥ 1</span>:</p>
      <div class="math-equation">(a+b)^n = Σ_(p=0)^n C_n^p a^(n-p)b^p</div>
      <p>2. ليكن <span class="math">x</span> و<span class="math">y</span> عددين حقيقيين. استعمل الدستور السابق لنشر عبارة من الشكل <span class="math">(x+y)^n</span>.</p>
      <button class="solution-toggle" type="button" data-solution="${binomialInductionKey}">${binomialInductionOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${binomialInductionOpen ? "open" : ""}" id="solution-${binomialInductionKey}">
        <p><strong>1. البرهان بالتراجع:</strong></p>
        <p>نعرّف الخاصية:</p>
        <div class="math-equation">P(n): (a+b)^n = Σ_(p=0)^n C_n^p a^(n-p)b^p</div>
        <p><strong>الانطلاق:</strong> من أجل <span class="math">n=1</span>:</p>
        <div class="math-equation">Σ_(p=0)^1 C_1^p a^(1-p)b^p = C_1^0 a + C_1^1 b = a+b</div>
        <p>إذن الخاصية صحيحة من أجل <span class="math">n=1</span>.</p>
        <p><strong>فرضية التراجع:</strong> نفرض أن الخاصية صحيحة من أجل رتبة <span class="math">n</span>:</p>
        <div class="math-equation">(a+b)^n = Σ_(p=0)^n C_n^p a^(n-p)b^p</div>
        <p><strong>الانتقال إلى <span class="math">n+1</span>:</strong></p>
        <div class="math-equation">(a+b)^(n+1) = (a+b)(a+b)^n</div>
        <p>نعوّض باستعمال فرضية التراجع:</p>
        <div class="math-equation">(a+b)^(n+1) = (a+b) Σ_(p=0)^n C_n^p a^(n-p)b^p</div>
        <p>فنحصل على مجموعتين:</p>
        <div class="math-equation">Σ_(p=0)^n C_n^p a^(n+1-p)b^p + Σ_(p=0)^n C_n^p a^(n-p)b^(p+1)</div>
        <p>بعد تغيير الفهرس في المجموع الثاني واستعمال علاقة باسكال:</p>
        <div class="math-equation">C_n^(p) + C_n^(p-1) = C_(n+1)^p</div>
        <p>نحصل على:</p>
        <div class="math-equation">(a+b)^(n+1) = Σ_(p=0)^(n+1) C_(n+1)^p a^(n+1-p)b^p</div>
        <p>إذن الخاصية صحيحة من أجل <span class="math">n+1</span>، وبالتراجع فهي صحيحة لكل <span class="math">n ≥ 1</span>.</p>
        <p><strong>2. التطبيق على <span class="math">(x+y)^n</span>:</strong></p>
        <div class="math-equation">(x+y)^n = Σ_(p=0)^n C_n^p x^(n-p)y^p</div>
        <p>مثلا من أجل <span class="math">n=3</span>:</p>
        <div class="math-equation">(x+y)^3 = x^3 + 3x^2y + 3xy^2 + y^3</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 22</span>
      <h3>سحب كرات مرقمة من 1 إلى 20</h3>
      <p>يحتوي كيس على 20 كرة مرقمة من 1 إلى 20، لا نفرق بينها عند اللمس.</p>
      <ol class="question-list">
        <li>نسحب كرة من الكيس. ما احتمال الحصول على:
          <br>أ) كرة تحمل عددًا مضاعفًا للعدد 4؟
          <br>ب) كرة تحمل عددًا ليس من مضاعفات 5؟
        </li>
        <li>نسحب كرتين في آن واحد. ما احتمال الحصول على:
          <br>أ) كرتين تحملان عددين مضاعفين للعدد 4؟
          <br>ب) كرتين إحداهما تحمل عددًا مضاعفًا للعدد 3 والثانية تحمل عددًا مضاعفًا للعدد 4؟
        </li>
        <li>نسحب الآن 3 كرات في آن واحد. ما احتمال الحصول على:
          <br>أ) ثلاث كرات تحمل أعدادًا مضاعفة للعدد 4؟
          <br>ب) ثلاث كرات مجموع أرقامها زوجي؟
        </li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${numberedBallsKey}">${numberedBallsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${numberedBallsOpen ? "open" : ""}" id="solution-${numberedBallsKey}">
        <p><strong>1. سحب كرة واحدة:</strong></p>
        <p>أ) مضاعفات 4 بين 1 و20 هي: 4، 8، 12، 16، 20. عددها 5.</p>
        <div class="math-equation">P = 5/20 = 1/4</div>
        <p>ب) مضاعفات 5 بين 1 و20 هي: 5، 10، 15، 20. عددها 4، إذن الأعداد التي ليست من مضاعفات 5 عددها 16.</p>
        <div class="math-equation">P = 16/20 = 4/5</div>
        <p><strong>2. سحب كرتين في آن واحد:</strong></p>
        <p>عدد السحبات الممكنة هو:</p>
        <div class="math-equation">C_20^2 = 190</div>
        <p>أ) كرتان تحملان عددين مضاعفين للعدد 4: نختار كرتين من بين 5 كرات.</p>
        <div class="math-equation">P = C_5^2 / C_20^2 = 10/190 = 1/19</div>
        <p>ب) مضاعفات 3 عددها 6: 3، 6، 9، 12، 15، 18. ومضاعفات 4 عددها 5: 4، 8، 12، 16، 20.</p>
        <p>نحسب الأزواج التي فيها كرة من مضاعفات 3 وكرة من مضاعفات 4. العدد <span class="math">12</span> مشترك بين المجموعتين، ولا يمكن اختياره مرتين، لذلك نطرح الحالة غير الممكنة.</p>
        <div class="math-equation">6 × 5 - 1 = 29</div>
        <div class="math-equation">P = 29/190</div>
        <p><strong>3. سحب ثلاث كرات في آن واحد:</strong></p>
        <p>عدد السحبات الممكنة هو:</p>
        <div class="math-equation">C_20^3 = 1140</div>
        <p>أ) ثلاث كرات تحمل أعدادًا مضاعفة للعدد 4: نختار 3 كرات من بين 5.</p>
        <div class="math-equation">P = C_5^3 / C_20^3 = 10/1140 = 1/114</div>
        <p>ب) مجموع الأرقام يكون زوجيًا إذا كانت الأعداد الثلاثة كلها زوجية، أو كان بينها عددان فرديان وعدد زوجي.</p>
        <p>بين 1 و20 يوجد 10 أعداد زوجية و10 أعداد فردية.</p>
        <div class="math-equation">عدد الحالات الملائمة = C_10^3 + C_10^2 × C_10^1 = 120 + 450 = 570</div>
        <div class="math-equation">P = 570/1140 = 1/2</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 23</span>
      <h3>سحب ثلاث كرات ملونة ومرقمة</h3>
      <p>يحتوي كيس على 10 كرات متماثلة: خمس منها بيضاء تحمل الأرقام <span class="math">1,1,2,2,3</span>، وثلاث كرات خضراء تحمل الأرقام <span class="math">1,2,3</span>، وكرتان حمراوان تحملان الرقمين <span class="math">3,3</span>.</p>
      <p>نسحب عشوائيًا ثلاث كرات في الحين نفسه.</p>
      <ol class="question-list">
        <li>ما احتمال الحصول على:
          <br>أ) كرة بيضاء وكرتين حمراوين؟
          <br>ب) كرة حمراء على الأقل؟
          <br>ج) ثلاث كرات مجموع أرقامها يفوق العدد 7؟
        </li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${coloredNumberedBallsKey}">${coloredNumberedBallsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${coloredNumberedBallsOpen ? "open" : ""}" id="solution-${coloredNumberedBallsKey}">
        <p>عدد السحبات الممكنة لثلاث كرات من أصل 10 هو:</p>
        <div class="math-equation">C_10^3 = 120</div>
        <p>أ) كرة بيضاء وكرتان حمراوان: نختار كرة واحدة من 5 بيضاء، ونختار الكرتين الحمراوين معًا:</p>
        <div class="math-equation">C_5^1 × C_2^2 = 5 × 1 = 5</div>
        <div class="math-equation">P = 5/120 = 1/24</div>
        <p>ب) كرة حمراء على الأقل. نستعمل المتممة: لا توجد أي كرة حمراء، أي نختار 3 كرات من غير الحمراء وعددها 8.</p>
        <div class="math-equation">P = 1 - C_8^3/C_10^3 = 1 - 56/120 = 64/120 = 8/15</div>
        <p>ج) مجموع الأرقام يفوق 7. أعداد الكرات حسب الرقم هي:</p>
        <ul class="question-list">
          <li>الرقم 1: ثلاث كرات.</li>
          <li>الرقم 2: ثلاث كرات.</li>
          <li>الرقم 3: أربع كرات.</li>
        </ul>
        <p>حتى يكون المجموع أكبر من 7، الحالات الممكنة للأرقام هي: <span class="math">3,3,3</span> أو <span class="math">2,3,3</span>.</p>
        <div class="math-equation">عدد حالات (3,3,3) = C_4^3 = 4</div>
        <div class="math-equation">عدد حالات (2,3,3) = C_3^1 × C_4^2 = 3 × 6 = 18</div>
        <div class="math-equation">عدد الحالات الملائمة = 4 + 18 = 22</div>
        <div class="math-equation">P = 22/120 = 11/60</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 24</span>
      <h3>نرد غير متوازن</h3>
      <p>نرمي نردًا غير متوازن أوجهه تحمل الأرقام <span class="math">1,2,3,4,5,6</span>. نرمز إلى احتمالات ظهور هذه الأوجه في رمية واحدة بـ:</p>
      <div class="math-equation">P_1, P_2, P_3, P_4, P_5, P_6</div>
      <p>علما أن الأعداد <span class="math">P_1, P_2, P_3</span> بهذا الترتيب حدود متتالية هندسية، وكذلك الأعداد <span class="math">P_4, P_5, P_6</span>.</p>
      <ol class="question-list">
        <li>أوجد الأعداد <span class="math">P_1, P_2, P_3, P_4, P_5, P_6</span> حسب المعطيات المتاحة.</li>
        <li>نرمي النرد مرة واحدة:
          <br>أ) ما احتمال ظهور رقم زوجي؟
          <br>ب) ما احتمال ظهور رقم مضاعف للعدد 3؟
        </li>
        <li>ليكن <span class="math">X</span> المتغير العشوائي الذي يرفق بكل رمية العدد المحصل عليه.
          <br>عرّف قانون الاحتمال واحسب أمله الرياضي وتباينه وانحرافه المعياري.
        </li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${weightedDieKey}">${weightedDieOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${weightedDieOpen ? "open" : ""}" id="solution-${weightedDieKey}">
        <div class="definition-box">
          <strong>تنبيه:</strong> من الصورة تظهر شروط المتتاليتين الهندسيتين، لكنها لا تعطي علاقات عددية كافية لتعيين القيم الست عدديا. لذلك نكتب الحل العام، وإذا أضيفت علاقة أخرى من نص التمرين يمكن استخراج القيم النهائية مباشرة.
        </div>
        <p>بما أن <span class="math">P_1, P_2, P_3</span> حدود متتالية هندسية، نكتب:</p>
        <div class="math-equation">P_1 = a, P_2 = aq, P_3 = aq^2</div>
        <p>وبما أن <span class="math">P_4, P_5, P_6</span> حدود متتالية هندسية، نكتب:</p>
        <div class="math-equation">P_4 = b, P_5 = br, P_6 = br^2</div>
        <p>ولأنها احتمالات، يجب أن يكون مجموعها مساويا لـ <span class="math">1</span>:</p>
        <div class="math-equation">a(1+q+q^2) + b(1+r+r^2) = 1</div>
        <p>مع الشروط:</p>
        <div class="math-equation">a ≥ 0, b ≥ 0, q ≥ 0, r ≥ 0</div>
        <p>2. أ) ظهور رقم زوجي يعني ظهور <span class="math">2</span> أو <span class="math">4</span> أو <span class="math">6</span>:</p>
        <div class="math-equation">P(X زوجي) = P_2 + P_4 + P_6 = aq + b + br^2</div>
        <p>ب) ظهور رقم مضاعف للعدد <span class="math">3</span> يعني ظهور <span class="math">3</span> أو <span class="math">6</span>:</p>
        <div class="math-equation">P(X مضاعف لـ3) = P_3 + P_6 = aq^2 + br^2</div>
        <p>3. قانون احتمال المتغير العشوائي <span class="math">X</span> هو:</p>
        <table class="theory-table">
          <thead><tr><th>x</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead>
          <tbody><tr><th>P(X=x)</th><td>a</td><td>aq</td><td>aq²</td><td>b</td><td>br</td><td>br²</td></tr></tbody>
        </table>
        <p>الأمل الرياضي:</p>
        <div class="math-equation">E(X)=a+2aq+3aq^2+4b+5br+6br^2</div>
        <p>نحسب أولا <span class="math">E(X^2)</span>:</p>
        <div class="math-equation">E(X^2)=a+4aq+9aq^2+16b+25br+36br^2</div>
        <p>التباين:</p>
        <div class="math-equation">Var(X)=E(X^2)-[E(X)]^2</div>
        <p>والانحراف المعياري:</p>
        <div class="math-equation">σ(X)=√Var(X)</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 25</span>
      <h3>سحب كرتين دون إرجاع</h3>
      <p>يضم كيس 10 كرات: 8 كرات بيضاء وكرتين سوداويتين. نسحب كرتين على التوالي دون إرجاع.</p>
      <p>نرمز بـ <span class="math">B_1</span> إلى الحادثة "الكرة المسحوبة في السحبة الأولى بيضاء"، وبـ <span class="math">B_2</span> إلى الحادثة "الكرة المسحوبة في السحبة الثانية بيضاء".</p>
      <ol class="question-list">
        <li>احسب الاحتمال <span class="math">p(B_1)</span>.</li>
        <li>احسب الاحتمال الشرطي <span class="math">p(B_2 / B_1)</span>.</li>
        <li>استنتج <span class="math">p(B_2 ∩ B_1)</span>.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${twoWhiteBallsKey}">${twoWhiteBallsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${twoWhiteBallsOpen ? "open" : ""}" id="solution-${twoWhiteBallsKey}">
        <p>في البداية يوجد في الكيس 8 كرات بيضاء من أصل 10، لذلك:</p>
        <div class="math-equation">p(B_1)=8/10=4/5</div>
        <p>إذا تحققت الحادثة <span class="math">B_1</span>، فهذا يعني أننا سحبنا كرة بيضاء أولًا ولم نرجعها إلى الكيس. إذن يبقى في الكيس 9 كرات، منها 7 بيضاء.</p>
        <div class="math-equation">p(B_2 / B_1)=7/9</div>
        <div class="definition-box">
          <strong>قاعدة الاحتمال الشرطي:</strong>
          <div class="math-equation">p(B_2 ∩ B_1)=p(B_1) × p(B_2 / B_1)</div>
        </div>
        <p>بالتعويض:</p>
        <div class="math-equation">p(B_2 ∩ B_1)=4/5 × 7/9 = 28/45</div>
        <p class="property-box"><strong>النتيجة:</strong> احتمال الحصول على كرتين بيضاوين في السحبتين هو <span class="math">28/45</span>.</p>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 26</span>
      <h3>نقل كرة بين كيسين</h3>
      <p>لدينا كيسان <span class="math">A</span> و<span class="math">B</span>. يضم الكيس <span class="math">A</span> خمس كرات حمراء وخمس كرات خضراء، ويضم الكيس <span class="math">B</span> ثلاث كرات حمراء وكرتين خضراوين وكرتين سوداويتين.</p>
      <p>نسحب كرة من الكيس <span class="math">A</span> ونضعها داخل الكيس <span class="math">B</span>، ثم نسحب كرة من الكيس <span class="math">B</span>.</p>
      <ol class="question-list">
        <li>ما احتمال الحصول على كرتين من نفس اللون؟</li>
        <li>ما احتمال أن تكون الكرة الأولى حمراء، بشرط أن تكون الكرة الثانية سوداء؟</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${transferBetweenBagsKey}">${transferBetweenBagsOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${transferBetweenBagsOpen ? "open" : ""}" id="solution-${transferBetweenBagsKey}">
        <p>احتمال نقل كرة حمراء من الكيس <span class="math">A</span> هو:</p>
        <div class="math-equation">P(R_1)=5/10=1/2</div>
        <p>واحتمال نقل كرة خضراء من الكيس <span class="math">A</span> هو:</p>
        <div class="math-equation">P(V_1)=5/10=1/2</div>
        <p><strong>1. احتمال الحصول على كرتين من نفس اللون:</strong></p>
        <p>إذا نقلنا كرة حمراء إلى <span class="math">B</span> يصبح في <span class="math">B</span>: 4 حمراء، 2 خضراء، 2 سوداء، أي 8 كرات. إذن:</p>
        <div class="math-equation">P(R_2/R_1)=4/8=1/2</div>
        <p>إذا نقلنا كرة خضراء إلى <span class="math">B</span> يصبح في <span class="math">B</span>: 3 حمراء، 3 خضراء، 2 سوداء، أي 8 كرات. إذن:</p>
        <div class="math-equation">P(V_2/V_1)=3/8</div>
        <p>إذن احتمال الحصول على كرتين من نفس اللون هو:</p>
        <div class="math-equation">P = P(R_1)P(R_2/R_1)+P(V_1)P(V_2/V_1)</div>
        <div class="math-equation">P = 1/2 × 1/2 + 1/2 × 3/8 = 1/4 + 3/16 = 7/16</div>
        <p><strong>2. احتمال أن تكون الكرة الأولى حمراء بشرط أن تكون الكرة الثانية سوداء:</strong></p>
        <p>نريد حساب:</p>
        <div class="math-equation">P(R_1/S_2)=P(R_1 ∩ S_2)/P(S_2)</div>
        <p>إذا كانت الكرة الأولى حمراء، فإن عدد الكرات السوداء في <span class="math">B</span> يبقى 2 من أصل 8:</p>
        <div class="math-equation">P(R_1 ∩ S_2)=1/2 × 2/8 = 1/8</div>
        <p>أما احتمال أن تكون الكرة الثانية سوداء فهو لا يتأثر بلون الكرة المنقولة، لأن عدد الكرات السوداء يبقى دائما 2 من أصل 8:</p>
        <div class="math-equation">P(S_2)=2/8=1/4</div>
        <p>إذن:</p>
        <div class="math-equation">P(R_1/S_2)= (1/8)/(1/4)=1/2</div>
      </div>
    </article>
    <article class="exercise-card">
      <span class="label">تمرين 27</span>
      <h3>تغيير محتوى صندوق بعد السحب</h3>
      <p>يضم صندوق كرتين سوداويتين وثلاث كرات بيضاء. نسحب عشوائيًا كرة واحدة.</p>
      <p>إذا كانت الكرة المسحوبة بيضاء، نعيدها إلى الصندوق ونضيف كرتين بيضاوين أخريين. وإذا كانت سوداء، نعيدها إلى الصندوق ونضيف كرة سوداء أخرى، ثم نجري عملية السحب مرة ثانية.</p>
      <p>احسب احتمال الحوادث التالية:</p>
      <ol class="question-list">
        <li><span class="math">A</span>: يوجد 3 كرات سوداء في الصندوق قبل السحبة الثانية.</li>
        <li><span class="math">B</span>: يوجد 5 كرات بيضاء في الصندوق قبل السحبة الثانية.</li>
      </ol>
      <button class="solution-toggle" type="button" data-solution="${adaptiveBoxKey}">${adaptiveBoxOpen ? "إخفاء الحل" : "إظهار الحل"}</button>
      <div class="solution-panel ${adaptiveBoxOpen ? "open" : ""}" id="solution-${adaptiveBoxKey}">
        <p>في البداية يحتوي الصندوق على 2 كرات سوداء و3 كرات بيضاء، أي 5 كرات.</p>
        <p>الحادثة <span class="math">A</span> تتحقق إذا كانت الكرة الأولى سوداء، لأننا نعيدها ثم نضيف كرة سوداء، فيصبح عدد الكرات السوداء:</p>
        <div class="math-equation">2 + 1 = 3</div>
        <p>إذن:</p>
        <div class="math-equation">P(A)=P(سوداء في السحبة الأولى)=2/5</div>
        <p>الحادثة <span class="math">B</span> تتحقق إذا كانت الكرة الأولى بيضاء، لأننا نعيدها ثم نضيف كرتين بيضاوين، فيصبح عدد الكرات البيضاء:</p>
        <div class="math-equation">3 + 2 = 5</div>
        <p>إذن:</p>
        <div class="math-equation">P(B)=P(بيضاء في السحبة الأولى)=3/5</div>
        <p class="property-box"><strong>النتيجة:</strong> <span class="math">P(A)=2/5</span> و <span class="math">P(B)=3/5</span>.</p>
      </div>
    </article>
  `;
  enhanceMath(document.getElementById("practiceGrid"));
}

function renderBac() {
  const allowedTracks = Object.keys(bacTrackLabels).filter((track) => track !== "all");
  if (state.bacTrackFilter !== "all" && !allowedTracks.includes(state.bacTrackFilter)) {
    state.bacTrackFilter = "all";
  }
  const branchExercises = bacExercises.filter((ex) => allowedTracks.includes(ex.track));
  const trackFiltered = state.bacTrackFilter === "all"
    ? branchExercises
    : branchExercises.filter((ex) => ex.track === state.bacTrackFilter);
  const visibleTrackLabels = [
    ["all", "كل الشعب"],
    ...allowedTracks.map((track) => [track, bacTrackLabels[track]]),
  ];
  const bacIntroTitle = "بكالوريا جزائرية";
  const bacIntroText = "مواضيع وتمارين حسب الشعب";
  const years = ["الكل", ...new Set(trackFiltered.map((ex) => ex.year))].sort((a, b) => {
    if (a === "الكل") return -1;
    if (b === "الكل") return 1;
    return b - a;
  });
  const filtered = state.bacYearFilter === "الكل"
    ? trackFiltered
    : trackFiltered.filter((ex) => ex.year.toString() === state.bacYearFilter.toString());
  const topicOrder = { "الموضوع الأول": 1, "الموضوع الثاني": 2 };
  const sortedFiltered = [...filtered].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (topicOrder[a.topic] || 99) - (topicOrder[b.topic] || 99);
  });

  document.getElementById("bacGrid").innerHTML = `
    <section class="bac-branch-panel ${state.branch === "literary" ? "literary" : "science"}">
      <span class="kicker">${branchLabels[state.branch]}</span>
      <h3>${bacIntroTitle}</h3>
      <p>${bacIntroText}</p>
    </section>
    <div class="bac-filter-bar">
      <div class="bac-filter-label">
        <span class="filter-icon">☰</span>
        <span>تصفية حسب الشعبة:</span>
      </div>
      <div class="bac-filter-buttons">
        ${visibleTrackLabels.map(([track, label]) => `
          <button
            class="bac-filter-btn ${state.bacTrackFilter === track ? "active" : ""}"
            type="button"
            data-bac-track="${track}"
          >${label}</button>
        `).join("")}
      </div>
    </div>
    <div class="bac-filter-bar">
      <div class="bac-filter-label">
        <span class="filter-icon">☰</span>
        <span>تصفية حسب السنة:</span>
      </div>
      <div class="bac-filter-buttons">
        ${years.map((year) => `
          <button
            class="bac-filter-btn ${state.bacYearFilter.toString() === year.toString() ? "active" : ""}"
            type="button"
            data-bac-year="${year}"
          >${year}</button>
        `).join("")}
      </div>
    </div>
    <div class="bac-exercises-list">
      ${sortedFiltered.length > 0 ? sortedFiltered.map((exercise) => {
        const isOpen = state.bacOpenSolutions[exercise.id];
        return `
          <article class="bac-exercise-card">
            <div class="bac-exercise-header">
              <h3 class="bac-exercise-title">
                <span class="bac-year-badge">${exercise.year}</span>
                <span class="bac-track-badge">${bacTrackLabels[exercise.track]}</span>
                بكالوريا ${exercise.year} - ${exercise.topic}
              </h3>
            </div>
            <div class="bac-exercise-body">
              <div class="bac-exercise-text">${exercise.text.replace(/\n/g, "<br>")}</div>
              ${exercise.diagram || ""}
            </div>
            <div class="bac-exercise-footer">
              <button
                class="bac-solution-toggle ${isOpen ? "active" : ""}"
                type="button"
                data-bac-solution="${exercise.id}"
              >
                ${isOpen ? "إخفاء الحل" : "إظهار الحل المنظم"}
                <span class="toggle-icon">${isOpen ? "▲" : "▼"}</span>
              </button>
            </div>
            <div class="bac-solution-panel ${isOpen ? "open" : ""}" id="bac-solution-${exercise.id}">
              <div class="bac-solution-title">الحل المفصل:</div>
              <div class="bac-solution-text">${exercise.solution.replace(/\n/g, "<br>")}</div>
            </div>
          </article>
        `;
      }).join("") : `
        <div class="bac-empty">لا توجد مواضيع مطابقة لهذا الفيلتر حاليًا.</div>
      `}
    </div>
  `;
  enhanceMath(document.getElementById("bacGrid"));
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

  const bacYearBtn = event.target.closest("[data-bac-year]");
  if (bacYearBtn) {
    state.bacYearFilter = bacYearBtn.dataset.bacYear;
    renderBac();
  }

  const bacTrackBtn = event.target.closest("[data-bac-track]");
  if (bacTrackBtn) {
    state.bacTrackFilter = bacTrackBtn.dataset.bacTrack;
    state.bacYearFilter = "الكل";
    renderBac();
  }

  const bacSolutionBtn = event.target.closest("[data-bac-solution]");
  if (bacSolutionBtn) {
    const id = parseInt(bacSolutionBtn.dataset.bacSolution, 10);
    state.bacOpenSolutions[id] = !state.bacOpenSolutions[id];
    renderBac();
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
