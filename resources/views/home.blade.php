@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    <button type="button" class="btn btn-primary float-right" @click="nuevoDato()">Nuevo</button>
                    <br><br>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Profesion</th>
                                <th scope="col">Salario</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dato in datos">
                                <th scope="row">@{{ dato.id }}</th>
                                <td>@{{ dato.name }}</td>
                                <td>@{{ dato.profession }}</td>
                                <td>@{{ dato.salary }}</td>
                                <td>
                                    <button type="button" class="btn btn-info" @click="editarDatos(dato)">Editar</button>
                                    <button type="button" class="btn btn-danger" @click=" eliminarDatos(dato)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection