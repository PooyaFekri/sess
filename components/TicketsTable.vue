<template>
    <v-container>
        
        <v-card width="100%" justify="center" style="background: #DCE4EB;">
            <v-card-title class="text-h5 lighten-2 ticket_title_background mb-5" >
            لیست تیکت ها
            </v-card-title>

            <v-row justify="center">
                <v-col cols="11">
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        sort-by="calories"
                        class="elevation-1"
                    >

                    </v-data-table>
                </v-col>
            </v-row>
            
        </v-card>
    </v-container>
</template>

<script>


export default {
    data() {
        return {
            headers: [
                {
                text: 'ردیف',
                align: 'start',
                value: 'name',
                },
                { text: 'نوع تیکت', value: 'calories', sortable: false  },
                { text: 'تاریخ', value: 'fat', sortable: false  },
                { text: 'فرستنده', value: 'carbs', sortable: false  },
                { text: 'توضیحات', value: 'protein', sortable: false  },
                { text: 'وضعیت', value: 'actions', sortable: false },
                { text: '', value: 'actions', sortable: false }
            ],

            
        }
    },
}
</script>


<style scoped>

  .ticket_title_background {
    background: #3F505E;
    color: white;
    display: flex;
    justify-content: center;
  }

  .terminate_ticket {
    background: #E28743;
    color: white;
    width: 128px;
  }

  .cancel_ticket {
    background: #84A7C4;
    color: white;
    width: 128px;
  }

  .ticket_background {
    background: #DCE4EB;
  }

  .closeWhite {
    color: white;
    background: white;
  }

  .comments_color {
    color: #3F505E;
    font-size: 24px;
  }

</style>
