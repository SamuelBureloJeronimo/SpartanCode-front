import { UserModel } from "./user";
import { productModule } from "./product";
import { AddressModel } from "./address";

export class saleModel {
  public _id:string = "";
  public fecha:string = "";
  public address:AddressModel = new AddressModel();
  public user:UserModel = new UserModel();
  public articulo:productModule = new productModule();
  public cantidad:number = 0;
  public total:number = 0;
  public status:Boolean = false;
}
