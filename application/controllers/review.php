<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Review extends CI_Controller {

    public function lists()
    {
        $this->load->layout('review/review-list');
    }

}