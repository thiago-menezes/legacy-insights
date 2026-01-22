'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { conditionalSpread } from '@/utils/conditional-spread';
import { sanitizeValue, sanitizeNumber, sanitizePhone } from './sanitize';
import type {
  PageData,
  UserData,
  UserInteractionDetails,
  LeadCursoDetails,
  EcommerceData,
} from './types';

export const sendPageView = (page: PageData, user: UserData) => {
  sendGTMEvent({
    event: 'pageView',
    page: {
      name: sanitizeValue(page.name),
      pagePath: page.pagePath,
      area: page.area,
      flow: page.flow,
      productType: page.productType,
      environment: page.environment,
      platform: page.platform,
    },
    user: {
      id: user.id,
      email: user.email,
      msisdn: user.msisdn,
      isLoggedin: user.isLoggedin,
      address: conditionalSpread(!!user.address, {
        city: user.address?.city,
        state: user.address?.state,
        country: user.address?.country,
      }),
      machine: conditionalSpread(!!user.machine, {
        userAgent: user.machine?.userAgent,
        screenResolution: user.machine?.screenResolution,
        language: user.machine?.language,
      }),
    },
  });
};

export const sendUserInteraction = (details: UserInteractionDetails) => {
  sendGTMEvent({
    event: 'user_interaction',
    event_details: {
      component: details.component,
      action: details.action,
      description: details.description
        ? sanitizeValue(details.description)
        : undefined,
      step: details.step ? sanitizeValue(details.step) : undefined,
      value: details.value ?? 0,
    },
  });
};

export const sendLeadCurso = (details: LeadCursoDetails) => {
  sendGTMEvent({
    event: 'leadCurso',
    'form-details': {
      ies: sanitizeValue(details.ies),
      modalidade: sanitizeValue(details.modalidade),
      'tipo-graduacao': sanitizeValue(details.tipoGraduacao),
      turno: sanitizeValue(details.turno),
      'forma-de-ingresso': sanitizeValue(details.formaDeIngresso),
      action: 'form-submit',
      step: 'lead-curso',
      curso: sanitizeValue(details.curso),
      nome: details.nome,
      sobrenome: details.sobrenome,
      email: details.email,
      telefone: sanitizePhone(details.telefone),
      value: details.value ?? 0,
    },
  });
};

export const sendBeginCheckout = (ecommerce: EcommerceData) => {
  sendGTMEvent({
    event: 'begin_checkout',
    ecommerce: {
      coupon: ecommerce.coupon,
      currency: ecommerce.currency,
      value: sanitizeNumber(ecommerce.value),
      items: ecommerce.items.map((item) => ({
        item_name: sanitizeValue(item.item_name),
        item_id: item.item_id,
        price: sanitizeNumber(item.price),
        item_brand: sanitizeValue(item.item_brand),
        item_category: sanitizeValue(item.item_category),
        quantity: item.quantity,
      })),
    },
  });
};

export const sendAddToCart = (ecommerce: EcommerceData) => {
  sendGTMEvent({
    event: 'add_to_cart',
    ecommerce: {
      coupon: ecommerce.coupon,
      currency: ecommerce.currency,
      value: sanitizeNumber(ecommerce.value),
      items: ecommerce.items.map((item) => ({
        item_name: sanitizeValue(item.item_name),
        item_id: item.item_id,
        price: sanitizeNumber(item.price),
        item_brand: sanitizeValue(item.item_brand),
        item_category: sanitizeValue(item.item_category),
        quantity: item.quantity,
      })),
    },
  });
};
