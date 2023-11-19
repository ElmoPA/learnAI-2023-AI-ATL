#!/bin/bash
./cloud-sql-proxy studyarai:us-east1:sql-instance-1 -c "$GOOGLE_APPLICATION_CREDENTIALS" &
