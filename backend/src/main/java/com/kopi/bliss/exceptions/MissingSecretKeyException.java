package com.kopi.bliss.exceptions;

public class MissingSecretKeyException extends RuntimeException {
  public MissingSecretKeyException(String message) {
    super(message);
  }
}
