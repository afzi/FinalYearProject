/**
 * <autocomplete>
 * -----------------------------------------------------------------------------
 * A sync or async drop-down list of suggestions.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('autocomplete', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: {
            isAsync: {
                type: Boolean,
                required: false,
                default: false,
            },
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
            for: {
                type: String,
                required: true
            },
            map: {
                type: String,
                required: false
            },
            action: {
                type: String,
                required: false
            },
            params: {
                type: String,
                required: false,
                default: () => "{}"
            }

        },
    
  
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function (){
        return {
            isOpen: false,
            results: [],
            search: '',
            isLoading: false,
            arrowCounter: -1,
            incomingData: []
        };
    },
  
    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
<div class="autocomplete">
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results"
    >
      <li
        class="loading"
        v-if="isLoading"
      >
        Loading results...
      </li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
    `,
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      //…
    },
    mounted: async function(){
      $(`#${this.for}`).on('input', this.onChange);

      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy: function() {
      //…
    },
    destroyed: function() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    watch: {
        // Once the items content changes, it means the parent component
        // provided the needed data
        incomingData: function (value, oldValue) {

            // we want to make sure we only do this when it's an async request
            if (this.isAsync) {
                this.results = value;
                if(this.results && this.results.length > 0) {
                  this.isOpen = true;
                } else {
                  this.isOpen = false;
                }
                this.isLoading = false;
            }
        }
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
        onChange() {
            this.search = $(`#${this.for}`).val()
            // Let's warn the parent that a change was made
            // this.$emit(`#${this.for}`, this.search);
            let argins = JSON.parse(this.params);
            argins[this.map || this.for] = this.search;
    
            // Is the data given by an outside ajax request?
            if (this.isAsync) {
              this.isLoading = true;
              Cloud[this.action].with(argins).then(result => {
                  this.incomingData = result.map(nextResult => nextResult[this.map || this.for]);
              });
            } else {
              // Data is sync, we can search our flat array
              this.filterResults();
              this.isOpen = true;
            }
        },

        filterResults() {
           this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        },

        close() {
            this.isLoading = false;
            this.isOpen = false;
        },

        setResult(result) {
            $(`#${this.for}`).off('input', this.onChange);
            $(`#${this.for}`).data('locked', 1);
            $(`#${this.for}`).val(result);
            $(`#${this.for}`).data('locked', 0);
            $(`#${this.for}`)[0].dispatchEvent(new Event('input'));
            $(`#${this.for}`).on('input', this.onChange);
            this.close();
        },

        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
              this.arrowCounter = this.arrowCounter + 1;
            }
          },

        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },

        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
              this.arrowCounter = -1;
              $(`#${this.for}`).data('locked', 0);
              this.close();
            }
        },

        onEnter() {
            $(`#${this.for}`).val(this.results[this.arrowCounter]);
            $(`#${this.for}`).data('locked', 0);
            this.close();
            this.arrowCounter = -1;
        }
  
    }
  });
  