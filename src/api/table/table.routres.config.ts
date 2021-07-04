import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import TableMiddleware from "./table.middleware";
import RestaurantMiddleware from "../restaurant/restaurant.middleware";
import TableController from "./table.controller";

export const TABLE_BASE_PATH = "/table";
export const tableWithRestaurantId = `${TABLE_BASE_PATH}/:restaurantId`;

export const PATHS = {
  tableSessions: `${tableWithRestaurantId}/sessions`,
  tableServers: `${tableWithRestaurantId}/servers`,
};

export class RestaurantRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RestaurantRoutes");
  }

  configureRoutes() {
    this.app.route(tableWithRestaurantId).post();

    this.app.route(tableWithRestaurantId).get();

    this.app
      .route(PATHS.tableSessions)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        TableMiddleware.isTablePartOfRestaurant,
        TableController.getTableSessions
      );

    this.app
      .route(PATHS.tableServers)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        TableMiddleware.isTablePartOfRestaurant,
        TableController.getTableServers
      );

    this.app
      .route(PATHS.tableServers)
      .put(
        RestaurantMiddleware.isValidGetRestaurant,
        TableMiddleware.isTablePartOfRestaurant,
        RestaurantMiddleware.areServersPartOfRestaurant,
        TableController.addServersToTable
      );

    this.app
      .route(PATHS.tableServers)
      .put(
        RestaurantMiddleware.isValidGetRestaurant,
        TableMiddleware.isTablePartOfRestaurant,
        RestaurantMiddleware.areServersPartOfRestaurant,
        TableController.removeServersFromTable
      );

    return this.app;
  }
}
