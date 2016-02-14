#!/bin/bash
echo "############# ensuring you're on 'master' branch #############"
git checkout master

echo "############# showing 'status' #############"
git status

echo "############# adding changes #############"
git add .

echo "############# committing into 'master' #############"
git commit -m "evolving"

echo "############# moving to 'openshift' #############"
git checkout openshift

echo "############# getting changes of 'master' #############"
git merge --no-ff master -m "going to RHC"

echo "############# pushing to 'openshift' #############"
git push openshift HEAD:master

echo "############# moving back to 'master' #############"
git checkout master

echo "############# forcing restart #############"
rhc app restart sc
