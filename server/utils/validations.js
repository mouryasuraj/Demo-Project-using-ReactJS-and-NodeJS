import validator from "validator";
import { allowedLoginFields, allowedReviewStatusType, allowedSendStatusType, allowedSignUpFields } from "./constants.js";

// Signup
export const validateSignUpData = (req) => {
  if (!req.body) {
    throw new Error("Request body is missing.");
  }
  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length === 0) {
    throw new Error("Request body is missing.");
  }

  const invalidFields = reqBodyKeys.filter(
    (field) => !allowedSignUpFields.includes(field)
  );
  if (invalidFields.length !== 0) {
    throw new Error("Invalid fields: " + invalidFields.join(","));
  }

  const isFieldMissing = !allowedSignUpFields.every((field) =>
    reqBodyKeys.includes(field)
  );
  if (isFieldMissing) {
    throw new Error("Missing fields");
  }

  const { fullName, email, password, age, photoUrl } = req.body;

  const validateIsEmptyField = [
    {
      isValid: !fullName,
      message: "fullName is required",
    },
    {
      isValid: !email,
      message: "email is required",
    },
    {
      isValid: !password,
      message: "password is required",
    },
    {
      isValid: !age,
      message: "age is required",
    },
    {
      isValid: !photoUrl,
      message: "photoUrl is required",
    },
  ];
  validateIsEmptyField.forEach((data) => {
    if (data.isValid) {
      throw new Error(data.message);
    }
  });

  const validateFieldValues = [
    {
      isValid: !(fullName.length >= 4 && fullName.length < 20),
      message: "Full Name should be greater than 4 and less than 20",
    },
    {
      isValid: !validator.isEmail(email),
      message: "Invalid Email",
    },
    {
      isValid: !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
      message: "Password is not strong",
    },
    {
      isValid: !(age >= 18 || age <= 100),
      message: "Age is not valid, age must be grater than or equal to 18",
    },
    {
      isValid: !validator.isURL(photoUrl),
      message: "Photo URL is not valid",
    },
  ];

  validateFieldValues.forEach((data) => {
    if (data.isValid) {
      throw new Error(data.message);
    }
  });
};
export const validateLoginData = (req) => {
  if (!req.body) {
    throw new Error("Request body is missing.");
  }
  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length === 0) {
    throw new Error("Request body is missing.");
  }

  const invalidFields = reqBodyKeys.filter(
    (field) => !allowedLoginFields.includes(field)
  );
  if (invalidFields.length !== 0) {
    throw new Error("Invalid fields: " + invalidFields.join(","));
  }

  const isFieldMissing = !allowedLoginFields.every((field) =>
    reqBodyKeys.includes(field)
  );
  if (isFieldMissing) {
    throw new Error("Missing fields");
  }

  const { email, password } = req.body;

  const validateIsEmptyField = [
    {
      isValid: !email,
      message: "email is required",
    },
    {
      isValid: !password,
      message: "password is required",
    },
  ];
  validateIsEmptyField.forEach((data) => {
    if (data.isValid) {
      throw new Error(data.message);
    }
  });

  const validateFieldValues = [
    {
      isValid: !validator.isEmail(email),
      message: "Invalid Email",
    },
  ];

  validateFieldValues.forEach((data) => {
    if (data.isValid) {
      throw new Error(data.message);
    }
  });
};



export const validateSendConnectionData = (req) => {
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  if (!toUserId || !status)
    throw new Error(
      `${!toUserId ? "toUserId" : "status"} params is not present`
    );

  const isStatusAllowed = allowedSendStatusType.includes(status);
  if (!isStatusAllowed) {
    throw new Error(`Invalid status type : ${status}`);
  }
};



export const validateReviewRequestBody = (req) =>{
  const {status} = req.params
  const isStatusAllowed = allowedReviewStatusType.includes(status)
  if(!isStatusAllowed){
    throw new Error(`Invalid status type : ${status}`)
  }
}
