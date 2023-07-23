import { Component } from "@angular/core";
import { userService } from "../../../services/user.service";
import { Router } from "@angular/router";

@Component
({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class loginComponent{
    public emailValue: string;
    public passValue: string;

    public lblErr_Email: string;
    public lblErr_Pass: string;
    
    public isErrorEmailHidden: boolean;
    public isErrorPassHidden: Boolean;

    public isBtnLoginDisabled: boolean;

    public res: any;

    private ERR_MSG = {
        invalideEmail: "*El correo ingresado es invalido. Intentalo nuevamente...",
        fieldRequired: "*El campo es requerido",
        focusLost: "Se perdio el foco"
    }
    private Error_Types = {
        fieldEmpty: ""
    }

    constructor(private _loginServie: userService,private _router:Router){
        this.isBtnLoginDisabled = true;
        this.emailValue = "";
        this.passValue = "";
        this.lblErr_Email = "";
        this.lblErr_Pass = "";
        this.isErrorEmailHidden = true;
        this.isErrorPassHidden = true;
    }

    login()
    {
        //Validate for second time the Email and the Password
        if(!this.Email_Validate())
            return;
        if(!this.Pass_Validate())
            return;
        //Create the collection with the info required
        const data = {
            correo_electronico: this.emailValue,
            password: this.passValue
        };
        //It invoque the method loginUser of the Service Login
        this._loginServie.loginUser(data).subscribe
        (
            (response) => {
                this.res = response;
                if(this.res.msg != "Login exitoso")
                {
                    alert(this.res.msg);
                    console.log(this.res.msg);
                    return;
                }
                this._router.navigate(['/home']);
                console.log(this.res);
                localStorage.setItem("token", response.token);
                window.location.href = window.location.origin;
            },
            (error) => {
                console.error("Error tipo: "+error);
                this._router.navigate(['/']);
                return;
            }
        );
    }

    Email_Validate(): Boolean
    {
        //Validate that input-text is not empty
        if(this.emailValue == this.Error_Types.fieldEmpty)
        {
            this.lblErr_Email = this.ERR_MSG.fieldRequired;
            this.isErrorEmailHidden = false;
            this.isBtnLoginDisabled = true;
            return false;
        }
        //validate that it cointain a @
        if(!this.containsOne(this.emailValue, "@"))
        {
            this.isErrorEmailHidden = false;
            this.lblErr_Email = this.ERR_MSG.invalideEmail;
            this.isBtnLoginDisabled = true;
            console.log("Contiene mas de una vez el @ o no lo contiene");
            return false;
        }

        //validate that it contains a dominain
        if(!this.containsOne(this.emailValue, "gmail") && !this.containsOne(this.emailValue, "outlook"))
        {
            this.isErrorEmailHidden = false;
            this.isBtnLoginDisabled = true;
            this.lblErr_Email = this.ERR_MSG.invalideEmail;
            console.log("No contiene dominio");
            return false;
        }

        //validate that it cointain .com
        if(!this.containsOne(this.emailValue, ".com"))
        {
            this.isErrorEmailHidden = false;
            this.isBtnLoginDisabled = true;
            this.lblErr_Email = this.ERR_MSG.invalideEmail;
            console.log("el .com");
            return false;
        }

        //validate the field Password
        if(this.passValue == this.Error_Types.fieldEmpty)
            this.isBtnLoginDisabled = true;
        else this.isBtnLoginDisabled = false;

        //If all goes well, enable the button
        this.isErrorEmailHidden = true;
        return true;
    }
    Pass_Validate(): Boolean
    {
        //validate that it isn't empty
        if(this.passValue == this.Error_Types.fieldEmpty)
        {
            this.lblErr_Pass = this.ERR_MSG.fieldRequired;
            this.isErrorPassHidden = false;
            this.isBtnLoginDisabled = true;
            return false;
        }
        //validate the field Password
        if(this.emailValue == this.Error_Types.fieldEmpty)
            this.isBtnLoginDisabled = true;
        else this.isBtnLoginDisabled = false;

        //If all goes well, enable the button
        this.isErrorPassHidden = true;
        return true;
    }
    /*******************************************************************************************************/
    /****************************  My personal Methods ************************************************/
    containsOne(string: string, letra: string): boolean 
    {
        const regex = new RegExp(`${letra}`, 'g');
        const coincidencias = string.match(regex);
        return coincidencias !== null && coincidencias.length === 1;
    }
}