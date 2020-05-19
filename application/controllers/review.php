<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Review extends MY_Controller {

    public function lists()
    {
        $this->load->layout('review/review-list');
    }

}