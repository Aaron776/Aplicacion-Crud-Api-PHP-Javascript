var url="http://localhost:8080/index_empleados.php";
var modal=new bootstrap.Modal(document.getElementById('modal'),{keyboard:false}) ;

var aplicacion=new function(){
    this.nombre= document.getElementById('nombre');
    this.correo=document.getElementById('correo');

    this.idEditar= document.getElementById('idEditar');
    this.nombreEditar= document.getElementById('nombreEditar');
    this.correoEditar=document.getElementById('correoEditar');

    this.empleados=document.getElementById('empleados');
    this.leer=function(){
        var datos="";

        fetch(url).then(r=>r.json()).then((respuesta)=>{ // el fetch se usa cuando vamos a consumir una api y dentro del aprentesis va la url de la api que vamos a conseguir
            console.log(respuesta)
            respuesta.map(x=>{
                datos+="<tr>";
                datos+="<td>"+x.id+"</td>" // aqui estpy imprimiendo los registros de mi base de datos usando el map
                datos+="<td>"+x.nombre+"</td>";
                datos+="<td>"+x.correo+"</td>";
                datos+='<td> <div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-primary" onclick="aplicacion.editar('+x.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.borrar('+x.id+')">Borrar</button></div>'+"</td>"
                datos+="</tr>";

            })
            return this.empleados.innerHTML=datos
        }).catch(console.log)

        // datos="<td>1</td><td>Aaron</td><td>aronortiz@yahoo,com</td><td>Editar|Borrar</td>"
        
    };

    this.agregar=function(){
        console.log(nombre.value)
        console.log(correo.value)
        var datosEnviar={nombre:this.nombre.value,correo:this.correo.value}

        fetch(url+"?insertar=1",{method:"POST",body:JSON.stringify(datosEnviar)}).then(r=>r.json()).then(datos_respuesta=>{

            console.log("Datos insertados");
            this.leer();

        }).catch(console.log);
    };

    this.borrar=function(id){ // aqui creo la funcion para borrar el registro mediante el id o identificador
        console.log(id)

        fetch(url+"?borrar="+id).then(r=>r.json()).then(()=>{

            console.log("Empleado Borrar");
            this.leer();

        }).catch(console.log);

    }

    this.editar=function(id){ // aqui estoy recuperando la infomacion para proceder a actualziar los registros
        console.log(id);

        fetch(url+"?consultar="+id).then(r=>r.json()).then((x)=>{
            console.log(x)
            this.nombreEditar.value=x[0].nombre
            this.correoEditar.value=x[0].correo
            this.idEditar.value=x[0].id

        }).catch(console.log);

         modal.show();
    }

    this.actualizar=function(){
        var datosEnviar={id:this.idEditar.value,nombre:this.nombreEditar.value,correo:this.correoEditar.value} 
        
        fetch(url+"?actualizar=1",{method:"POST",body:JSON.stringify(datosEnviar)}).then(r=>r.json()).then(datos_respuesta=>{

            console.log("Datos Actualizados");
            this.leer();
            modal.hide();

        }).catch(console.log);
    }
}

aplicacion.leer();

