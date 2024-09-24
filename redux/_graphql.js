import { gql } from '@apollo/client';

export const REGISTER_VENDOR_MUTATION = gql`
  mutation RegisterVendor($input: VendorInput!) {
    registerVendor(input: $input) {
      token
    }
  }
`;

export const LOGIN_VENDOR_MUTATION = gql`
  mutation LoginVendor($email: String!, $password: String!) {
    loginVendor(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_All_PRODUCT = gql`
query GetAllProductsForAllVendors {
  getAllProductsForAllVendors {
      id
      title
      slug
      price
      desc
      totalSell
      condition
      vendor
      brand
      category
      featured
      trending
      variations
      material
      tags
      sizes
      review
      rating
      stock
      ratingScore
      dimension
      createdAt
      updatedAt
      images {
        img
      }
      discount {
          banner
          percentage
          expireDate
          isActive
      }
      gallery {
          thumb
      }
  }
}
`;

export const ADD_PRODUCT = gql`
  mutation UpdateProductByAdmin {
    updateProductByAdmin(id: null, input: null) {
        id
        nameEn
        nameAr
        price
        descriptionEn
        descriptionAr
        brandEn
        brandAr
        categoryEn
        categoryAr
        colorEn
        colorAr
        sizeEn
        sizeAr
        materialEn
        materialAr
        weight
        dimensionsEn
        dimensionsAr
        imageUrl
        createdAt
        updatedAt
    }
}
`;
export const GetAllVendors = gql`
  query GetAllVendors {
    getAllVendors {
        id
        name
        email
        address
        phone
        description
        logo
    }
  }
`;


