import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as models from "../models";
import bcrypt from "bcrypt";
import { IUserType } from "../types";
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});
let router, adminJs;

/**
 * this will return array of { label:  string, value: string},
 * the value is the row id
 * CAUTION it will fetch all records from the database
 * @param {Modle} model
 */

const userParent = {
  name: "User Controlls",
  icon: "Accessibility",
};
adminJs = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: models.User,
      options: {
        parent: userParent,

        properties: {
          userName: {
            isTitle: true,
          },
        },
      },
    },
    {
      resource: models.Officer,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.Rank,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.Branch,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.UserType,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.Vacation,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.VacationType,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.VacationsCredit,
      options: {
        parent: userParent,
      },
    },
    {
      resource: models.InOutTracking,
      options: {
        parent: userParent,
      },
    },
  ],
});

router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await models.User.findOne({
      where: [
        {
          userName: email,
        },
      ],
    }).populate<{ userType: IUserType }>("userType");
    if (user) {
      if (user.userType.userType == "admin") {
        const matched = await bcrypt.compare(password, user.password);
        console.log({ matched });
        if (matched) {
          return user;
        }
      }
    }

    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});
export { router, adminJs };
