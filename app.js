var module = (function ($) {
    function question(title, optionA, optionB, optionAScores, type) {
        return {
            title: title,
            optionA: optionA,
            optionB: optionB,
            optionAScores: optionAScores,
            type: type
        };
    }

    var questionTitle = $('#questionTitle');
    var buttons = {
        optionA: $('#optionA'),
        optionB: $('#optionB')
    };

    var answers = {
        PsG: 0,
        PsB: 0,
        PvG: 0,
        PvB: 0,
        PmG: 0,
        PmB: 0
    };

    var answer = function (isOptionA) {
        if (!currentQuestion) {
            throw new Error;
        }
        if (isOptionA === currentQuestion.optionAScores) {
            answers[currentQuestion.type]++;
        }
        if (questions.length > 0) {
            nextQuestion();
        } else {
            showResult(answers);
        }
    };

    var showResult = function (answers) {
        $('#questionPanel').hide().after(
            $('#resultTemplate').render(
                getResult(answers)
            )
        );
    };

    var questions = [
        question('Проект, за который вы отвечали, оказался весьма успешным', 'Я внимательно следил за работой каждого', 'Все отдавали ему много времени и сил', true, 'PsG'),
        question('Вы и ваш супруг (а) (друг, подруга) миритесь после ссоры', 'Я простил (а) еѐ (его)', 'Обычно я прощаю', false, 'PsG'),
        question('Вы заблудились, когда ехали к дому приятеля', 'Я проскочил поворот', 'Приятель неправильно объяснил дорогу', true, 'PsB'),
        question('Ваш супруг (а) (друг, подруга) удивляет вас подарком', 'Он (она) получил (а) повышение', 'Я сводил (а) еѐ (его) вчера на специальный обед', false, 'PsG'),
        question('Вы забываете про день рождения своего супруга (друга, подруги)', 'Я плохо запоминаю дни рождения', 'У меня голова была занята другими вещами', true, 'PmB'),
        question('Вы получаете цветок от неизвестного воздыхателя', 'Я для него (неѐ) привлекательна (привлекателен)', 'Я популярная личность', false, 'PvG'),
        question('Вы боретесь за выборный пост и получаете его', 'Я уделяю много времени и сил выборной кампании', 'Я всегда упорно работаю во имя достижения цели', false, 'PvG'),
        question('Вы пропускаете важную встречу', 'Иногда память подводит меня', 'Иногда я забываю просмотреть еженедельник', true, 'PvB'),
        question('Вы баллотируетесь на выборный пост и проигрываете', 'Я недостаточно энергично провел (а) кампанию', 'У человека, который выиграл, было больше знакомых', true, 'PsB'),
        question('Вы успешно провели банкет', 'Я был (а) особенно обаятелен в этот вечер', 'Я хороший хозяин (хозяйка)', false, 'PmG'),
        question('Вы помешали преступлению, вызвав милицию', 'Моѐ внимание привлѐк странный шум', 'Этой ночью я был (а) начеку', false, 'PsG'),
        question('В этом году ваше здоровье было особенно хорошим', 'В моѐм окружении почти не было больных, вот я и не заразился', 'Я старался хорошо питаться и достаточно отдыхать', false, 'PsG'),
        question('Вы должны библиотеке деньги за просроченную книгу', 'Когда книга меня по-настоящему увлекает, я часто забываю про срок', 'Я так был занят отчетом, что забыл вернуть книгу', true, 'PmB'),
        question('Ваши акции принесли вам порядочный доход', 'Мой маклер решил вложить деньги во что-нибудь новенькое', 'Мой маклер – первоклассный инвестор', false, 'PmG'),
        question('Вы выиграли спортивное соревнование', 'Я чувствовал, что я – непобедим', 'Я здорово тренировался', false, 'PmG'),
        question('Вы провалили важный экзамен', 'Другие экзаменующиеся были ловчее меня', 'Я недостаточно хорошо готовился', true, 'PvB'),
        question('Вы приготовили для друга специальное угощение, а он (она) к нему почти не притронулся', 'Я неважный повар', 'Я готовил (а) второпях', true, 'PvB'),
        question('Вы проиграли спортивное соревнование, к которому долго готовились', 'Не такой уж я атлет', 'Я не очень силѐн в этом виде спорта', true, 'PvB'),
        question('У вашей машины кончился бензин в позднее время на темной улице', 'Я не проверил, сколько бензина осталось в баке', 'Указатель был сломан', true, 'PsB'),
        question('Вы рассердились на друга (подругу)', 'Вечно он (она) меня раздражает', 'Он (она) был (а) агрессивно настроен (а)', true, 'PmB'),
        question('Вас оштрафовали за то, что вы не сдали вовремя декларацию о доходах', 'Я вечно откладываю уплату налогов', 'Я поленился оформить налоги в этом году', true, 'PmB'),
        question('Я предложил ей (ему) встретиться и получил (а) отказ', 'В этот день я потерпел (а) крах', 'Когда я просил (а) о свидании, мое красноречие меня покинуло', true, 'PvB'),
        question('Во время коллективной игры ведущий выбрал вас', 'Я сидел (а) на видном месте', 'Я выглядел (а) самым увлеченным', false, 'PsG'),
        question('Вас часто приглашают танцевать на вечеринке', 'Я выделяюсь на вечеринках', 'В этот вечер я был (а) в прекрасной форме', true, 'PmG'),
        question('Вы купили своему супругу (супруге) подарок, а ему (ей), он не понравился', 'Я не достаточно думаю, выбирая подарки', 'Уж очень он (она) привередничает', true, 'PsB'),
        question('Вы дали отличное интервью о своей работе', 'Во время интервью я чувствовал (а) себя очень уверенно', 'Я вообще хорошо даю интервью', false, 'PmG'),
        question('Вы пошутили, и все смеялись', 'Смешная была шутка', 'Я идеально выбрал момент', false, 'PsG'),
        question('Начальник дал вам очень мало времени, чтобы окончить проект, но вы все-таки успели', 'Я знаю свое дело', 'Я человек шустрый', false, 'PvG'),
        question('Последнее время я чувствую себя вымотанным', 'Вечно мне некогда отдохнуть', 'На этой неделе я был особенно загружен', true, 'PmB'),
        question('Вы приглашаете кого-то на танец и получаете отказ', 'Я недостаточно хорошо танцую', 'Ему (ей) не хочется танцевать', true, 'PsB'),
        question('Вы спасли человека, который чуть не задохнулся', 'Я знаю, как спасать от удушья', 'Я знаю, что делать в кризисных ситуациях', false, 'PvG'),
        question('Предмет ваших симпатий хочет, чтобы вы немного поостыли', 'Я слишком думаю о себе', 'Я не провожу с ним (с ней) достаточно времени', true, 'PvB'),
        question('Ваша подруга говорит что-то, оскорбляющее ваши чувства', 'Вечно она болтает, не задумываясь о других', 'У нее было плохое настроение, и она выместила его на мне', true, 'PmB'),
        question('Ваш руководитель обратился к вам за советом', 'Я специалист в той области, о которой меня спросили', 'Я прекрасно даю советы, причем полезные', false, 'PvG'),
        question('Друг благодарит вас за помощь в трудную минуту', 'Мне было приятно помочь ему (ей) в трудную минуту', 'Я забочусь о людях', false, 'PvG'),
        question('Вы прекрасно провели время на вечеринке', 'Все были дружелюбно настроены', 'Я был настроен дружелюбно', false, 'PsG'),
        question('Доктор говорит, что вы в хорошей физической форме', 'Я стараюсь чаще делать упражнения', 'Я придаю большое значение здоровью', false, 'PvG'),
        question('Ваш супруг (друг, подруга) увозит вас, чтобы провести выходной с вами', 'Ему (ей) было нужно уехать на несколько дней', 'Он (она) любит новые места', false, 'PmG'),
        question('Доктор говорит, что вы слишком много едите сахара', 'Я не очень слежу за своей диетой', 'Куда денешься, сахар – во всем', true, 'PsB'),
        question('Вас просят возглавить важный проект', 'Я успешно выполнил подобный проект', 'Я – хороший руководитель', false, 'PmG'),
        question('Вы много ссорились в последнее время со своим супругом (супругой)', 'Я что-то совсем озверел последнее время', 'Последнее время он (она) был (а) враждебно настроен (а).', true, 'PsB'),
        question('Катаясь на лыжах, вы много падаете', 'Лыжи – дело не простое', 'Лыжня совсем обледенела', true, 'PmB'),
        question('Вы получили престижную премию', 'Я решил (а) важную проблему', 'Я оказался (оказалась) важным работником', false, 'PvG'),
        question('У ваших акций все время низкий курс', 'Я ничего не знаю о деловой конъюнктуре', 'Я плохо выбрал (а) акции', true, 'PvB'),
        question('Вы выиграли в лотерею', 'Просто повезло', 'Я выбрал (а) верные номера', false, 'PsG'),
        question('Во время отпуска вы прибавили в весе, и теперь не можете его сбросить', 'В долговременном аспекте диета не работает', 'Диета, которую я попробовал (а), не работает', true, 'PmB'),
        question('Вы в больнице, и вас почти не навещают', 'Когда я болею, то становлюсь раздражительным (раздражительной)', 'У меня невнимательные друзья', true, 'PsB'),
        question('В магазине неуважительно относятся к вашей кредитной карточке', 'Я иногда переоцениваю оставшуюся сумму', 'Я иногда забываю перечислить деньги на свою карточку', true, 'PvB'),
    ];
    var currentQuestion;
    var nextQuestion = function () {
        currentQuestion = questions.shift();
        questionTitle.text(currentQuestion.title);
        buttons.optionA.text(currentQuestion.optionA);
        buttons.optionB.text(currentQuestion.optionB);
    };
    var getResult = function (answers) {
        var a = answers;
        result = {
            PsG: a.PsG,
            PsB: a.PsB,
            PvG: a.PvG,
            PvB: a.PvB,
            PmG: a.PmG,
            PmB: a.PmB,
            HoB: a.PmB + a.PvB,
            G: a.PmG + a.PsG + a.PvG,
            B: a.PmB + a.PsB + a.PvB
        };
        result.GmB = result.G - result.B;
        result.json = JSON.stringify(result);
        return result;
    };
    return {
        nextQuestion: nextQuestion,
        answer: answer,
        showResult: showResult
    };
})(jQuery);
(function ($) {
    $(function () {
        module.nextQuestion();
    });
    $('#startTest').click(function () {
        $('#questionPanel').show();
        $('#instructions').hide();
        $('#requestResult').hide();
    });
    $('#requestResultForm').submit(function (e) {
        e.preventDefault();
        try {
            var answers = JSON.parse(e.target.jsonData.value);
        } catch (e) {
            alert('Неверный формат данных!');
            return;
        }
        module.showResult(answers);
        $('#instructions').hide();
        $('#requestResult').hide();
    });
})(jQuery);