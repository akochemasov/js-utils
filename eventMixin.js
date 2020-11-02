/**
 * @author https://learn.javascript.ru/mixins
 *
 * .on(имя события, функция) – назначает функцию к выполнению при наступлении события с данным именем. Такие функции хранятся в защищённом свойстве объекта _eventHandlers.
 * .off(имя события, функция) – удаляет функцию из списка предназначенных к выполнению.
 * .trigger(имя события, аргументы) – генерирует событие, при этом вызываются все назначенные на него функции, и им передаются аргументы.
 *
 * // Класс Menu с примесью eventMixin
     function Menu() {
      // ...
    }

     for(var key in eventMixin) {
      Menu.prototype[key] = eventMixin[key];
    }

     // Генерирует событие select при выборе значения
     Menu.prototype.choose = function(value) {
      this.trigger("select", value);
    }

     // Создадим меню
     var menu = new Menu();

     // При наступлении события select вызвать эту функцию
     menu.on("select", function(value) {
      alert("Выбрано значение " + value);
    });

     // Запускаем выбор (событие select вызовет обработчики)
     menu.choose("123");
 */
var eventMixin = {

    /**
     * Подписка на событие
     * Использование:
     *  menu.on('select', function(item) { ... }
     */
    on: function (eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },

    /**
     * Прекращение подписки
     *  menu.off('select',  handler)
     */
    off: function (eventName, handler) {
        var handlers = this._eventHandlers && this._eventHandlers[eventName];
        if (!handlers) return;
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i--, 1);
            }
        }
    },

    /**
     * Генерация события с передачей данных
     *  this.trigger('select', item);
     */
    trigger: function (eventName /*, ... */) {

        if (!this._eventHandlers || !this._eventHandlers[eventName]) {
            return; // обработчиков для события нет
        }

        // вызвать обработчики
        var handlers = this._eventHandlers[eventName];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, [].slice.call(arguments, 1));
        }

    }
};