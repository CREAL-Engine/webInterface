#!/usr/bin/perl
# This script will download the correct information, and then take out the stop words from the original text
#
#
#
#
#
use 5.010;
use strict;
use warnings; 
#~ use JSON::XS; #I think this is right...

use JSON;
use JSON::Util;
use XML::LibXML;

#main link right here 
#~ https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=9274&retmode=xml






my $month;
my $year;
my $day; 
my $articleTitle;
my $journalTitle; 
my $abstractData; 
my $authors; 
my $xmlData = ""; #the main xml data will be here 
my $xmlIDData = ""; 
my $pubMedID = ""; 
my $i = 1; #iterator

my @authorsStack;
my @authorsLastName; 
my @authorsForeName; 
my @pubMedIdList; #main list for all of the pubmed articles 


my @stopList = ("a",
"about",
"above",
"after",
"again",
"against",
"all",
"am",
"an",
"and",
"any",
"are",
"aren't",
"as",
"at",
"be",
"because",
"been",
"before",
"being",
"below",
"between",
"both",
"but",
"by",
"can't",
"cannot",
"could",
"couldn't",
"did",
"didn't",
"do",
"does",
"doesn't",
"doing",
"don't",
"down",
"during",
"each",
"few",
"for",
"from",
"further",
"had",
"hadn't",
"has",
"hasn't",
"have",
"haven't",
"having",
"he",
"he'd",
"he'll",
"he's",
"her",
"here",
"here's",
"hers",
"herself",
"him",
"himself",
"his",
"how",
"how's",
"i",
"i'd",
"i'll",
"i'm",
"i've",
"if",
"in",
"into",
"is",
"isn't",
"it",
"it's",
"its",
"itself",
"let's",
"me",
"more",
"most",
"mustn't",
"my",
"myself",
"no",
"nor",
"not",
"of",
"off",
"on",
"once",
"only",
"or",
"other",
"ought",
"our",
"ours",
"ourselves",
"out",
"over",
"own",
"same",
"shan't",
"she",
"she'd",
"she'll",
"she's",
"should",
"shouldn't",
"so",
"some",
"such",
"than",
"that",
"that's",
"the",
"their",
"theirs",
"them",
"themselves",
"then",
"there",
"there's",
"these",
"they",
"they'd",
"they'll",
"they're",
"they've",
"this",
"those",
"through",
"to",
"too",
"under",
"until",
"up",
"very",
"was",
"wasn't",
"we",
"we'd",
"we'll",
"we're",
"we've",
"were",
"weren't",
"what",
"what's",
"when",
"when's",
"where",
"where's",
"which",
"while",
"who",
"who's",
"whom",
"why",
"why's",
"with",
"won't",
"would",
"wouldn't",
"you",
"you'd",
"you'll",
"you're",
"you've",
"your",
"yours",
"yourself",
"yourselves");


my $qrstring = '\b(' . (join '|', @stopList) . ')\b';
my %mainHashObject;




$xmlIDData = `curl "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=aging+human&retmax=100000"`;
### Download the list right here 

my $xmlListOfIds = XML::LibXML->load_xml(string => $xmlIDData);
my $globStringBuffer = ""; 

foreach my $pubMedIdXml ($xmlListOfIds->findnodes('/eSearchResult/IdList')) {

		#getting the authors now 		
		
		$globStringBuffer =  $pubMedIdXml->to_literal('/Id');
 
}



#~ chomp $tmp;
@pubMedIdList =  split('\n', $globStringBuffer);

#~ chomp($pubMedIdList[34]); #chomp the new linex

#~ print $pubMedIdList[34] . "\n";
#~ my @tmpStack; #i dunno 
#~ exit 0; 
#~ exit 0; 
for ($i = 3; $i < @pubMedIdList; $i++)
{
	chomp($pubMedIdList[$i]); 	
	$pubMedIdList[$i] =~ s/\t//; #substitution of the stuff  
	print $pubMedIdList[$i] . "\n"; 
	#~ exit 0;
				$pubMedID = $pubMedIdList[$i] ; 
				if ($pubMedID eq " ") {next;}
				print "Getting data \n "; 
				$xmlData = `curl "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=$pubMedID&retmode=xml"`;


				my $domObj = XML::LibXML->load_xml(string => $xmlData);


				foreach my $pubMedXml ($domObj->findnodes('//PubmedArticle')) {
					
					#~ $pubMedXml->findvalue('./MedlineCitation/Article/Abstract');
				#grabbing the dates    
				 $year =   $pubMedXml->findvalue('./MedlineCitation/Article/Journal/JournalIssue/PubDate/Year');
				 $month =   $pubMedXml->findvalue('./MedlineCitation/Article/Journal/JournalIssue/PubDate/Month');
				 $day =   $pubMedXml->findvalue('./MedlineCitation/Article/Journal/JournalIssue/PubDate/Day');

				#grabbing the titles 
				 $journalTitle =   $pubMedXml->findvalue('./MedlineCitation/Article/Journal/Title');
				 $articleTitle =   $pubMedXml->findvalue('./MedlineCitation/Article/ArticleTitle');

				#grabing the abstract
				 $abstractData =   $pubMedXml->findvalue('./MedlineCitation/Article/Abstract');
				 
				   
				}

				#grab all the authors 
				foreach my $pubMedXml ($domObj->findnodes('//Author')) {

				#getting the authors now 
				 push(@authorsStack,$pubMedXml->findvalue('./LastName') . " " . $pubMedXml->findvalue('./ForeName'));
				 
				}

				#~ chomp($abstractData);
				#~ print ;



				#Append values to perl hashes 

				$mainHashObject{'pubMedID'} = $pubMedID;
				$mainHashObject{'year'} = $year;
				$mainHashObject{'day'} = $day;
				$mainHashObject{'month'} = $month;
				$mainHashObject{'articleTitle'} = $articleTitle;
				$mainHashObject{'journalTitle'} = $journalTitle;
				$mainHashObject{'authors'} = join(', ',@authorsStack); #join the array values into a single string of csvs 
				$mainHashObject{'abstractData'} = $abstractData;
				$mainHashObject{'stemmedAbstractData'} = $abstractData;
				$mainHashObject{'stemmedAbstractData'} =~ s/$qrstring/ /g;

				#~ chomp($abstractData); 
				print $mainHashObject{'abstractData'};

				print "\n" . $mainHashObject{'stemmedAbstractData'} . "\n"; 


				#~ sleep 15; #make sure to sleep right here 
}; 



