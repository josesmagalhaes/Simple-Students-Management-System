new Vue({
    el: "#main_vue",
    data: {
        csrfmiddlewaretoken: csrf,
        Crud: {
            name: '',
            roll: ''
        },
        EditCrud: {
            name: '',
            roll: ''
        },
        ViewCrud: {
            name: '',
            roll: ''
        },
        search: '',
        AllData: [],
        errors: new Errors(),

    },
    methods: {
        formSubmit: function (event) {
            const _this = this;
            $.ajax({
                url: "/save",
                type: "POST",
                data: {
                    csrfmiddlewaretoken: _this.csrfmiddlewaretoken,
                    data: _this.Crud
                },
                success: function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        _this.AllData.push(data.data);
                        $(".close").click();
                        _this.ClearData();
                        toastr.success('Sucesso!', 'Novo estudante cadastrado com sucesso!');
                    } else if (data.status == 503) {
                        _this.errors.record(data.errors);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        },
        GetData: function () {
            const _this = this;
            $.ajax({
                url: '/save',
                type: "GET",
                success: function (response) {
                    if (response.status == 200) {
                        _this.AllData = response.data;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }

            });
        },
        Edit: function (index, data) {
            const _this = this;
            _this.EditCrud = data;
            $('#exampleModalTwo').modal('show');
        },
        UpdateSubmit: function (event) {
            const _this = this;
            $.ajax({
                url: "/update",
                type: "POST",
                data: {
                    csrfmiddlewaretoken: _this.csrfmiddlewaretoken,
                    data: _this.EditCrud
                },
                success: function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        $(".close").click();
                        _this.ClearData();
                        toastr.success('Sucesso!', 'Estudante atualizado com sucesso!');
                    } else if (data.status == 503) {
                        _this.errors.record(data.errors);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        },
        View: function (index, data) {
            const _this = this;
            _this.ViewCrud = data;
            $('#ViewModal').modal('show');
        },
        ClearData: function () {
            const _this = this;
            _this.Crud.name = '';
            _this.Crud.roll = '';
            _this.errors.record([]);
        },
        Delete: function (index, id) {
            const _this = this;
            const URL = '/delete';
            swal({
                title: "Você tem certeza?",
                text: "Você tem certeza que deseja excluir?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            url: URL,
                            type: "post",
                            data: {
                                csrfmiddlewaretoken: _this.csrfmiddlewaretoken,
                                id: id,
                            },
                            success: function (response) {
                                if (response.status == 200) {
                                    swal("Sucesso!", "Estudante excluído com sucesso!", "success");
                                    _this.AllData.splice(index, 1);
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(textStatus, errorThrown);
                            }
                        });
                    } else {
                        swal("Seus arquivos não foram alterados!");
                    }
                });
        }


    },
    created() {
        console.log('App Created');
        this.GetData();
        console.log(this.AllData);
    },
    computed: {
        filteredList() {
            return this.AllData.filter(data => {
                first_condition = data.name.toLowerCase().includes(this.search.toLowerCase());
                second=data.roll.toString().includes(this.search);
                return first_condition || second;
            });
        }
    }

});
