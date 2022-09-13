#!/bin/bash

export $(grep -v '^#' .env | xargs -L 1)