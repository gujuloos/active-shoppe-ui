/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CustomerDto } from '../models/customer-dto';
import { ProductDto } from '../models/product-dto';
import { PurchaseRequestDto } from '../models/purchase-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ShopControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation purchaseProducts
   */
  static readonly PurchaseProductsPath = '/api/v1/purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `purchaseProducts()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  purchaseProducts$Response(params: {
    body: PurchaseRequestDto
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, ShopControllerService.PurchaseProductsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `purchaseProducts$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  purchaseProducts(params: {
    body: PurchaseRequestDto
  }): Observable<{  }> {

    return this.purchaseProducts$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation getAllProducts
   */
  static readonly GetAllProductsPath = '/api/v1/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ShopControllerService.GetAllProductsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts(params?: {
  }): Observable<Array<ProductDto>> {

    return this.getAllProducts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation getAllCustomers
   */
  static readonly GetAllCustomersPath = '/api/v1/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CustomerDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ShopControllerService.GetAllCustomersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCustomers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers(params?: {
  }): Observable<Array<CustomerDto>> {

    return this.getAllCustomers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CustomerDto>>) => r.body as Array<CustomerDto>)
    );
  }

}
